import { Col, Row, Typography } from 'antd';

import { ActivationByCode } from '@mg-control/web/features/auth/activation';
import { useTitle } from '@mg-control/web/shared/lib';
import { View } from '@mg-control/web/shared/types';

import { $$activationPageModel } from './model';

export function ActivationPage(): View {
  useTitle('MG Control | Activation');

  return (
    <Row
      style={{
        maxWidth: 320,
        width: '100%',
      }}
      justify="center"
      align="middle"
      gutter={[0, 8]}
    >
      <Col span={24}>
        <Typography.Title
          style={{
            textAlign: 'center',
          }}
          level={4}
        >
          Device activation
        </Typography.Title>
      </Col>
      <Col span={24}>
        <ActivationByCode $$model={$$activationPageModel.$$activationByCodeModel} />
      </Col>
    </Row>
  );
}
