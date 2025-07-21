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
import ButtonBase from '@mui/material/ButtonBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SysButton } from '/imports/ui/components/SimpleFormFields/SysButton/SysButton';
import Box from '@mui/material/Box';

const ToDosDetailView = () => {
	const controller = useContext(ToDosDetailControllerContext);
	const open = Boolean(controller.anchorEl);
	const { state } = useContext(ToDosModuleContext);
	const isView = state === 'view';
	const isEdit = state === 'edit';
	const isCreate = state === 'create';
	const ehConcluida = controller.document.situacao === 'Concluída';
  const {
    Container,
    Body,
    Header,
    Footer,
    FormColumn
  } = ToDosDetailStyles;

	return (
		<Container>
			<Header sx={isView? {justifyContent: "flex-end"}: {}}>
				{isView? (
					<>
						<IconButton
							onClick={!isView ? controller.closePage : controller.openMenu}>
							{!isView ? <SysIcon name={'close'} /> : (
								<>
								<ButtonBase>
									<SysIcon name={"moreVert"}/>
								</ButtonBase>
								<Menu open={open} onClose={controller.closeMenu} anchorEl={controller.anchorEl}>
									<MenuItem onClick={() => controller.changeToEdit(controller.document._id || '')}>
										<SysIcon name={"edit"} />
										Editar
									</MenuItem>
									<MenuItem onClick={() => controller.onDeleteButtonClick(controller.task)}>
										<SysIcon name={"delete"} />
										Excluir
									</MenuItem>
								</Menu>
								</>
							)}
						</IconButton>
						<IconButton onClick={controller.closePage}>
							<SysIcon name={'close'} />
						</IconButton>
					</>
				): (<></>)
				}
				<Typography variant="h5">
					{isCreate ? 'Adicionar Item' : isEdit ? 'Editar Item' : ""}
				</Typography>
				{!isView? (
					<IconButton onClick={controller.closePage}>
						{<SysIcon name={'close'} />}
					</IconButton>
				): (<></>)
				}
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
							<FormControlLabel control={<Checkbox checked={ehConcluida} />} label={
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
						{ !isView && (
								<SysSelectField name="situacao" placeholder="Selecionar" sx={{display: "none"}}/>
							)
						}
						<SysSwitch name="ehTarefaPessoal" label="É tarefa pessoal?" />
					</FormColumn>
				</Body>
				<Footer sx={{"flexDirection": "column"}}>
					{!isView? (
						<Button variant="outlined" startIcon={<SysIcon name={'close'} />} onClick={controller.closePage}>
							Cancelar
						</Button>
					) : (
						<>
							<SysButton onClick={() => controller.changeToEdit(controller.document._id || '')}>
								Editar
							</SysButton>
							<Box display={"flex"}>
								<Typography variant='body1'>
									Criado por {controller.task?.owner}
								</Typography>
							</Box>
						</>
					)}
					<SysFormButton>Salvar</SysFormButton>
				</Footer>
			</SysForm>
		</Container>
	);
};

export default ToDosDetailView;
