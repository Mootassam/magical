import { i18n } from 'src/i18n';
import actions from 'src/modules/product/list/productListActions';
import selectors from 'src/modules/product/list/productListSelectors';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import FilterWrapper from 'src/view/shared/styles/FilterWrapper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import AutocompleteInMemoryFormItem from 'src/view/shared/form/items/AutocompleteInMemoryFormItem';
import ProductCategoryService from 'src/modules/productCategory/productCategoryService';

// Products are filtered by the storefront's product-category taxonomy
// (Women Clothing, Men Shoes, Global Purchase, ...), not the unrelated
// `category` entity - so this loads straight from ProductCategoryService
// instead of reusing CategoryAutocompleteFormItem.
const fetchProductCategories = async () => {
  const response = await ProductCategoryService.list(null, 'name_ASC', 100, 0);
  return response.rows || [];
};

const productCategoryMapper = {
  toAutocomplete(originalValue) {
    if (!originalValue) {
      return null;
    }

    const value = originalValue.id || originalValue.value;
    const label = originalValue.name || originalValue.label;

    return {
      key: value,
      value,
      label,
    };
  },

  toValue(originalValue) {
    if (!originalValue) {
      return null;
    }

    return {
      id: originalValue.value,
      label: originalValue.label,
    };
  },
};

const schema = yup.object().shape({
  title: yupFilterSchemas.string(
    i18n('entities.product.fields.title'),
  ),
  amount: yupFilterSchemas.decimal(
    i18n('entities.product.fields.amount'),
  ),
  category: yupFilterSchemas.relationToMany(
    i18n('entities.product.fields.category'),
  ),

});

const emptyValues = {
  title: null,
  amount: null,
  category: [],
};

const previewRenders = {
  title: {
    label: i18n('entities.product.fields.title'),
    render: filterRenders.generic(),
  },
  amount: {
    label: i18n('entities.product.fields.amount'),
    render: filterRenders.decimal(),
  },
  category: {
    label: i18n('entities.product.fields.category'),
    render: filterRenders.relationToMany(),
  },

};

function CouponsListFilter(props) {
  const rawFilter = useSelector(selectors.selectRawFilter);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const [initialValues] = useState(() => {
    return {
      ...emptyValues,
      ...rawFilter,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: 'all',
  });

  useEffect(() => {
    dispatch(
      actions.doFetch(
        schema.cast(initialValues),
        rawFilter,
      ),
    );
    // eslint-disable-next-line
  }, [dispatch]);

  const onSubmit = (values) => {
    const rawValues = form.getValues();
    dispatch(actions.doFetch(values, rawValues));
    setExpanded(false);
  };

  const onRemove = (key) => {
    form.setValue(key, emptyValues[key]);
    return form.handleSubmit(onSubmit)();
  };

  const onReset = () => {
    Object.keys(emptyValues).forEach((key) => {
      form.setValue(key, emptyValues[key]);
    });
    dispatch(actions.doReset());
    setExpanded(false);
  };

  return (
    <FilterWrapper>
      <FilterPreview
        onClick={() => {
          setExpanded(!expanded);
        }}
        renders={previewRenders}
        values={rawFilter}
        expanded={expanded}
        onRemove={onRemove}
      />
      <div className="container">
        <div
          className={`collapse ${expanded ? 'show' : ''}`}
        >
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-lg-6 col-12">
                  <InputFormItem
                    name="title"
                    label={i18n(
                      'entities.product.fields.title',
                    )}
                  />
                </div>
                <div className="col-lg-6 col-12">
                  <InputFormItem
                    name="amount"
                    label={i18n(
                      'entities.product.fields.amount',
                    )}
                  />
                </div>
                <div className="col-lg-6 col-12">
                  <AutocompleteInMemoryFormItem
                    name="category"
                    label={i18n(
                      'entities.product.fields.category',
                    )}
                    mode="multiple"
                    fetchFn={fetchProductCategories}
                    mapper={productCategoryMapper}
                  />
                </div>

              </div>

              <div className="row">
                <div className="col-12 filter-buttons">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={props.loading}
                  >
                    <ButtonIcon
                      loading={props.loading}
                      iconClass="fas fa-search"
                    />
                    {i18n('common.search')}
                  </button>
                  <button
                    className="btn btn-light"
                    type="button"
                    onClick={onReset}
                    disabled={props.loading}
                  >
                    <ButtonIcon
                      loading={props.loading}
                      iconClass="fas fa-undo"
                    />
                    {i18n('common.reset')}
                  </button>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </FilterWrapper>
  );
}

export default CouponsListFilter;
