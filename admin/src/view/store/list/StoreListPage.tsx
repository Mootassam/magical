import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/store/list/storeListActions';
import storeEnumerators from 'src/modules/store/storeEnumerators';
import StoreListTable from 'src/view/store/list/StoreListTable';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { Col, Container, Row } from 'react-bootstrap';

function StoreListPage(props) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(actions.doFetch());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const doFetchWith = (nextStatus, nextSearch) => {
    const filter = {
      ...(nextStatus ? { status: nextStatus } : {}),
      ...(nextSearch ? { search: nextSearch } : {}),
    };
    dispatch(actions.doFetch(filter, filter));
  };

  const onStatusChange = (event) => {
    const value = event.target.value;
    setStatus(value);
    doFetchWith(value, search);
  };

  const onSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const onSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      doFetchWith(status, search);
    }
  };

  const onSearchBlur = () => {
    doFetchWith(status, search);
  };

  return (
    <>
      <ContentWrapper>
        <Container fluid={true}>
          <Row>
            <Col xs={6}>
              <PageTitle>{i18n('entities.store.list.title')}</PageTitle>
            </Col>
            <Col md="auto">
              <input
                type="text"
                className="form-control"
                placeholder={i18n('entities.store.filters.searchPlaceholder')}
                value={search}
                onChange={onSearchChange}
                onKeyDown={onSearchKeyDown}
                onBlur={onSearchBlur}
              />
            </Col>
            <Col md="auto">
              <select
                className="form-control"
                value={status}
                onChange={onStatusChange}
              >
                <option value="">
                  {i18n('entities.store.filters.allStatuses')}
                </option>
                {storeEnumerators.status.map((value) => (
                  <option key={value} value={value}>
                    {i18n(`entities.store.enumerators.status.${value}`)}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
        </Container>
        <StoreListTable />
      </ContentWrapper>
    </>
  );
}

export default StoreListPage;
