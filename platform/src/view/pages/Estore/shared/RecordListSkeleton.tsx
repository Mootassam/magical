import React from "react";

function SkeletonBar({
  width = "100%",
  height = 10,
  style = {},
}: {
  width?: number | string;
  height?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="skeleton-bar"
      style={{ width, height, ...style }}
    />
  );
}

export function SummarySkeleton() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <div className="summary-item" key={i}>
          <SkeletonBar width={50} height={15} style={{ margin: "0 auto" }} />
          <SkeletonBar width={70} height={10} style={{ margin: "6px auto 0" }} />
        </div>
      ))}
      <style>{`
        .skeleton-bar{
          display:inline-block;
          border-radius:4px;
          background: linear-gradient(90deg, #F4F4F4 25%, #E7E7E7 37%, #F4F4F4 63%);
          background-size: 400% 100%;
          animation: skeleton-shimmer 1.4s ease infinite;
        }
        @keyframes skeleton-shimmer{
          0%{ background-position: 100% 50%; }
          100%{ background-position: 0 50%; }
        }
      `}</style>
    </>
  );
}

function RecordListSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <>
      <div className="day-label">
        <SkeletonBar width={120} height={11} />
      </div>

      {Array.from({ length: rows }).map((_, index) => (
        <div className="record-card" key={index}>
          <div className="record-top">
            <div>
              <SkeletonBar width={150} height={11} />
              <SkeletonBar width={110} height={10} style={{ marginTop: 6 }} />
            </div>
            <div className="record-right">
              <SkeletonBar width={70} height={14} style={{ marginLeft: "auto" }} />
              <SkeletonBar width={60} height={10} style={{ marginTop: 6, marginLeft: "auto" }} />
            </div>
          </div>
          <div className="record-bottom">
            <SkeletonBar width={70} height={20} style={{ borderRadius: 8 }} />
          </div>
        </div>
      ))}

      <style>{`
        .skeleton-bar{
          display:inline-block;
          border-radius:4px;
          background: linear-gradient(90deg, #F4F4F4 25%, #E7E7E7 37%, #F4F4F4 63%);
          background-size: 400% 100%;
          animation: skeleton-shimmer 1.4s ease infinite;
        }
        @keyframes skeleton-shimmer{
          0%{ background-position: 100% 50%; }
          100%{ background-position: 0 50%; }
        }
      `}</style>
    </>
  );
}

export default RecordListSkeleton;
