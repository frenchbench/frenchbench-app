import { FC, PropsWithChildren, ReactElement, useState } from 'react';
import { Icon, Input } from 'semantic-ui-react';

export interface FbEditableRenderEditEventArgs {
  error: boolean;
  isEditing: boolean;
  isUpdating: boolean;
  value: string;
  setValue(value: string): void;
}

export interface FbEditableProps {
  initialValue?: string;
  placeHolder?: string;
  onSubmit(value: string): Promise<boolean>;
  position?: 'left' | 'right';
  renderEdit?: (args: FbEditableRenderEditEventArgs) => ReactElement<any, any> | null;
}

const STAGE_VIEWING  = 'viewing';
const STAGE_EDITING  = 'editing';
const STAGE_UPDATING = 'updating';

const defaultStage = STAGE_VIEWING;

export const FbEditable: FC<FbEditableProps> = (props: PropsWithChildren<FbEditableProps>) => {
  const { initialValue = '', placeHolder = '', position = 'left', renderEdit = null } = props;
  const [error, setError] = useState(false);
  const [stage, setStage] = useState(defaultStage);
  const [value, setValue] = useState(initialValue ?? '');
  const isViewing  = stage === STAGE_VIEWING;
  const isEditing  = stage === STAGE_EDITING;
  const isUpdating = stage === STAGE_UPDATING;
  const onChange = (ev, data) => {
    console.log('onChange', data);
    setValue(data.value);
  };
  const onSubmit = async () => {
    setError(false); // reset
    setStage(STAGE_UPDATING);
    const result = await props.onSubmit(value);
    if (result) {
      setStage(STAGE_VIEWING);
    } else {
      setStage(STAGE_EDITING);
      setError(true);
    }
  }
  const onCancel = () => {
    setStage(STAGE_VIEWING);
  }
  if (isViewing) {
    return (
      <>
        {position === 'left' && <Icon name='edit' onClick={() => setStage(STAGE_EDITING)} />}
        {props.children}
        {position !== 'left' && <Icon name='edit' onClick={() => setStage(STAGE_EDITING)} />}
      </>
    );
  }
  // isEditing or isUpdating
  return (
    <span className='fb-editable'>
      {renderEdit ? renderEdit({ error, isEditing, isUpdating, value, setValue }) : (
        <Input placeholder={placeHolder} size='mini' error={error} disabled={!isEditing} loading={isUpdating} value={value} onChange={onChange} />
      )}
      <Icon name='save' disabled={!isEditing} onClick={onSubmit} />
      <Icon name='cancel' disabled={!isEditing} onClick={onCancel} />
    </span>
  );
}
