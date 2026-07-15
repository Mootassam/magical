import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/automatOrder/list/automatOrderListActions';
import automatOrderSelectors from 'src/modules/automatOrder/automatOrderSelectors';
import AutomatOrderListTable from 'src/view/automatOrder/list/AutomatOrderListTable';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import Toolbar from 'src/view/shared/styles/Toolbar';
import { Col, Container, Row } from 'react-bootstrap';

function AutomatOrderListPage(props) {
  const dispatch = useDispatch();

  const hasPermissionToManage = useSelector(
    automatOrderSelectors.selectPermissionToManage,
  );

  useEffect(() => {
    dispatch(actions.doFetch());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <ContentWrapper>
        <Container fluid={true}>
          <Row>
            <Col xs={9}>
              <PageTitle>
                {i18n('entities.automatOrder.list.title')}
              </PageTitle>
            </Col>
            <Col md="auto">
              {hasPermissionToManage && (
                <Toolbar>
                  <Link to="/automat-order/new">
                    <button className="btn btn-primary" type="button">
                      <ButtonIcon iconClass="fas fa-plus" />
                      &nbsp;{i18n('entities.automatOrder.new.button')}
                    </button>
                  </Link>
                </Toolbar>
              )}
            </Col>
          </Row>
        </Container>
        <AutomatOrderListTable />
      </ContentWrapper>
    </>
  );
}

export default AutomatOrderListPage;
