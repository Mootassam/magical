import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Tracks the background UK_data.csv sample-product import per tenant so
// progress survives a server restart. Without this, an interrupted import
// (e.g. a dev-server restart mid-run) would silently stop with no record
// of it ever happening, leaving the dataset partially imported with no way
// to tell or to resume from where it left off.
export default (database) => {
  try {
    return database.model("sampleProductImportRun");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const SampleProductImportRunSchema = new Schema(
    {
      tenant: {
        type: Schema.Types.ObjectId,
        ref: "tenant",
        required: true,
      },
      dataset: { type: String, required: true },
      status: {
        type: String,
        enum: ["running", "completed", "failed"],
        default: "running",
      },
      rowsProcessed: { type: Number, default: 0 },
      productsCreated: { type: Number, default: 0 },
      productsSkipped: { type: Number, default: 0 },
      errorMessage: { type: String, default: null },
      startedAt: { type: Date },
      finishedAt: { type: Date, default: null },
    },
    { timestamps: true }
  );

  // One tracked run per tenant+dataset - resumed/reused in place rather
  // than creating a new row every attempt.
  SampleProductImportRunSchema.index(
    { tenant: 1, dataset: 1 },
    { unique: true }
  );

  SampleProductImportRunSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  SampleProductImportRunSchema.set("toJSON", {
    getters: true,
  });

  SampleProductImportRunSchema.set("toObject", {
    getters: true,
  });

  return database.model("sampleProductImportRun", SampleProductImportRunSchema);
};
