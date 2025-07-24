import React, { useContext } from 'react';
import ToDosDetailContext, { IToDosDetailContext } from './toDosDetailContext';
import { IToDosModuleContext, ToDosModuleContext } from '../../toDosContainer';
import ToDosDetailStyles from './toDosDetailStyles';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { SysSelectField } from '/imports/ui/components/sysFormFields/sysSelectField/sysSelectField';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';
import SysSwitch from '/imports/ui/components/sysFormFields/sysSwitch/sysSwitch';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ButtonBase from '@mui/material/ButtonBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SysButton } from '/imports/ui/components/SimpleFormFields/SysButton/SysButton';
import Box from '@mui/material/Box';

const ToDosDetailView = () => {
	const context = useContext<IToDosDetailContext>(ToDosDetailContext);
	const open = Boolean(context.anchorEl);
	const { state } = useContext<IToDosModuleContext>(ToDosModuleContext);
	const isView = state === 'view';
	const isEdit = state === 'edit';
	const isCreate = state === 'create';
	const ehConcluida = context.document.situacao === 'Concluída';
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
						<IconButton onClick={!isView ? context.closePage : context.openMenu}>
							{!isView ? <SysIcon name={'close'} /> : <SysIcon name={"moreVert"}/>}	
						</IconButton> 
						{isView ? (
								<>
								<Menu open={open} onClose={context.closeMenu} anchorEl={context.anchorEl}>
									<MenuItem onClick={() => context.changeToEdit(context.document._id || '')}>
										<SysIcon name={"edit"} />
										Editar
									</MenuItem>
									<MenuItem onClick={() => context.onDeleteButtonClick(context.task)}>
										<SysIcon name={"delete"} />
										Excluir
									</MenuItem>
								</Menu>
								</>
						): (
								<></>
							)
						}
						<IconButton onClick={context.closePage}>
							<SysIcon name={'close'} />
						</IconButton>
					</>
				): (<></>)
				}
				<Typography variant="h5">
					{isCreate ? 'Adicionar Item' : isEdit ? 'Editar Item' : ""}
				</Typography>
				{!isView? (
					<IconButton onClick={context.closePage}>
						{<SysIcon name={'close'} />}
					</IconButton>
				): (<></>)
				}
			</Header>
			<SysForm
				mode={state as 'create' | 'view' | 'edit'}
				schema={context.schema}
				doc={context.document}
				onSubmit={context.onSubmit}
				loading={context.loading}>
				<Body>
					<FormColumn>
						{state == "view"? (
							<FormControlLabel control={<Checkbox checked={ehConcluida} />} label={
								<Typography variant="body1">{context.document.titulo}</Typography>
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
						<Button variant="outlined" startIcon={<SysIcon name={'close'} />} onClick={context.closePage}>
							Cancelar
						</Button>
					) : (
						<>
							<SysButton onClick={() => context.changeToEdit(context.document._id || '')}>
								Editar
							</SysButton>
							<Box display={"flex"}>
								<Typography variant='body1'>
									Criado por {context.task?.owner}
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
