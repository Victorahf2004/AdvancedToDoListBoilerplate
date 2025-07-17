import React, { useContext } from 'react';
import { ToDosDetailControllerContext } from './toDosDetailContoller';
import { ToDosModuleContext } from '../../toDosContainer';
import ToDosDetailStyles from './toDosDetailStyles';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { SysSelectField } from '/imports/ui/components/sysFormFields/sysSelectField/sysSelectField';
import { SysRadioButton } from '/imports/ui/components/sysFormFields/sysRadioButton/sysRadioButton';
import { SysCheckBox } from '/imports/ui/components/sysFormFields/sysCheckBoxField/sysCheckBoxField';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';
import { SysUploadFile } from '/imports/ui/components/sysFormFields/sysUploadFile/sysUploadFile';
import SysSlider from '/imports/ui/components/sysFormFields/sysSlider/sysSliderField';
import SysSwitch from '/imports/ui/components/sysFormFields/sysSwitch/sysSwitch';
import { SysLocationField } from '/imports/ui/components/sysFormFields/sysLocationField/sysLocationField';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const ToDosDetailView = () => {
	const controller = useContext(ToDosDetailControllerContext);
	const { state } = useContext(ToDosModuleContext);
	const isView = state === 'view';
	const isEdit = state === 'edit';
	const isCreate = state === 'create';
  const {
    Container,
    Body,
    Header,
    Footer,
    FormColumn
  } = ToDosDetailStyles;

	return (
		<Container>
			<Header>
				{isView && (
					<IconButton onClick={controller.closePage}>
						<SysIcon name={'arrowBack'} />
					</IconButton>
				)}
				<Typography variant="h5" sx={{ flexGrow: 1 }}>
					{isCreate ? 'Adicionar Item' : isEdit ? 'Editar Item' : controller.document.descricao}
				</Typography>
				<IconButton
					onClick={!isView ? controller.closePage : () => controller.changeToEdit(controller.document._id || '')}>
					{!isView ? <SysIcon name={'close'} /> : <SysIcon name={'edit'} />}
				</IconButton>
			</Header>
			<SysForm
				mode={state as 'create' | 'view' | 'edit'}
				schema={controller.schema}
				doc={controller.document}
				onSubmit={controller.onSubmit}
				loading={controller.loading}>
				<Body>
					<FormColumn>
						{state == "view"? (
							<FormControlLabel control={<Checkbox checked={Boolean(controller.document.situacao)} onChange={controller.checkBoxClick} />} label={
								<Typography variant="body1">{controller.document.titulo}</Typography>
							}/>
						): (
							<SysTextField name='titulo' />
						)}
						<SysTextField
							name="descricao"
							placeholder="Acrescente informações sobre a tarefa (3 linhas)"
							multiline
							rows={3}
							maxRows={3}
							showNumberCharactersTyped
							max={200}
						/>
						<SysSelectField name="situacao" placeholder="Selecionar" />
						<SysSwitch name="ehTarefaPessoal" label="É tarefa pessoal?" />
					</FormColumn>
				</Body>
				<Footer>
					{!isView && (
						<Button variant="outlined" startIcon={<SysIcon name={'close'} />} onClick={controller.closePage}>
							Cancelar
						</Button>
					)}
					<SysFormButton>Salvar</SysFormButton>
				</Footer>
			</SysForm>
		</Container>
	);
};

export default ToDosDetailView;
