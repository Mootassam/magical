import React from 'react';
import { i18n } from 'src/i18n';
import NotificationListTable from 'src/view/notification/list/NotificationListTable';
import NotificationListToolbar from 'src/view/notification/list/NotificationListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { Col, Container, Row } from 'react-bootstrap';

function NotificationListPage(props) {
  return (
    <>
      <ContentWrapper>
        <Container fluid={true}>
          <Row>
            <Col xs={9}>
              <PageTitle>
                {i18n('entities.notification.list.title')}
              </PageTitle>
            </Col>
            <Col md="auto">
              <NotificationListToolbar />
            </Col>
          </Row>
        </Container>
        <NotificationListTable />
      </ContentWrapper>
    </>
  );
}

export default NotificationListPage;
