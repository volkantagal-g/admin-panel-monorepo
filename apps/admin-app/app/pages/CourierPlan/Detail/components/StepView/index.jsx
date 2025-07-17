import { Collapse, Space, Spin } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { isStepActive } from '@app/pages/CourierPlan/utils';
import stepMap from './config';
import useStyles from './styles';
// eslint-disable-next-line no-unused-vars
import * as Types from '../../type';

const { Panel } = Collapse;

/**
 * @param {{
 *  plan: Types.Plan
 *  isPending: boolean;
 * }} props
 * @returns () => JSX.Element
 */
export default function Steps({ plan, isPending }) {
  const { t } = useTranslation(['courierPlanPage']);
  const classes = useStyles();
  const [currentStep, setCurrentStep] = useState();

  const steps = plan?.steps || [];

  const stepChange = stepKey => {
    setCurrentStep(stepKey);
  };

  useEffect(() => {
    stepChange(plan?.currentStep);
  }, [plan?.currentStep]);

  const StepComponent = useMemo(() => stepMap[currentStep], [currentStep]);

  return (
    <Collapse accordion activeKey={[currentStep]}>
      {steps.map(step => {
        return (
          <Panel
            key={step.key}
            id={`courier-plan-step-${step.key}`}
            header={t(`STEP_TYPES.${step.key}`)}
          >
            {isStepActive(step, currentStep) && (
              <Spin spinning={isPending}>
                <Space direction="vertical" className={classes.space}>
                  {plan && (
                    <StepComponent
                      step={step}
                      plan={plan}
                      isPending={isPending}
                      stepChange={stepChange}
                    />
                  )}
                </Space>
              </Spin>
            )}
          </Panel>
        );
      })}
    </Collapse>
  );
}
