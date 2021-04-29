import { memo, useCallback, useMemo, useState } from 'react'
import { Box, Button, Drawer, makeStyles } from '@material-ui/core'
import { PersonaState } from '../../hooks/usePersonaState'
import { PersonaCard } from '../PersonaCard'
import type { Persona } from '../../../../../../maskbook/src/database'
import type { PersonaInfo, PersonaProvider } from '../../settings'
import { useValueRef } from '../../../../../../maskbook/src/utils/hooks/useValueRef'
import { currentPersonaSettings } from '../../settings'
import { MaskColorVar } from '@dimensiondev/maskbook-theme'
import { AddPersonaCard } from '../AddPersonaCard'
import stringify from 'json-stable-stringify'

const useStyles = makeStyles((theme) => ({
    root: {
        top: `64px !important`,
    },
    paper: {
        top: `64px`,
        padding: theme.spacing(3.75, 3.75, 0, 3.75),
        background: MaskColorVar.suspensionBackground,
        '& > *': {
            marginTop: theme.spacing(1.5),
        },
    },
    backdrop: {
        background: 'none',
    },
    buttons: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridColumnGap: theme.spacing(3.5),
    },
    backup: {
        backgroundColor: MaskColorVar.warning,
        '&:hover': {
            backgroundColor: MaskColorVar.warning,
            boxShadow: `0 0 5px ${MaskColorVar.warning}`,
        },
    },
}))

export interface PersonaDrawer {
    personas: {
        persona: Persona
        providers: PersonaProvider[]
    }[]
}

export const PersonaDrawer = memo<PersonaDrawer>(({ personas }) => {
    const classes = useStyles()
    const [showAddPersonaCard, setShowAddPersonaCard] = useState(false)
    const { drawerOpen, toggleDrawer } = PersonaState.useContainer()
    const currentPersonaRef = useValueRef(currentPersonaSettings)

    const currentPersonIdentifier = useMemo(() => {
        return (JSON.parse(currentPersonaRef) as PersonaInfo)?.identifier ?? ''
    }, [currentPersonaRef])

    const onPersonaCardClick = useCallback((persona) => {
        currentPersonaSettings.value = stringify(persona)
    }, [])

    return (
        <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer}
            variant="temporary"
            ModalProps={{
                BackdropProps: {
                    className: classes.backdrop,
                },
            }}
            elevation={0}
            classes={{ root: classes.root, paper: classes.paper }}>
            {personas.map((item) => {
                const { persona, providers } = item
                return (
                    <PersonaCard
                        active={persona.identifier.toText() === currentPersonIdentifier}
                        key={persona.identifier.toText()}
                        persona={persona}
                        providers={providers}
                        onClick={() => onPersonaCardClick(item)}
                    />
                )
            })}
            {showAddPersonaCard && (
                <AddPersonaCard onConfirm={(name) => console.log(name)} onCancel={() => setShowAddPersonaCard(false)} />
            )}
            <Box className={classes.buttons}>
                <Button onClick={() => setShowAddPersonaCard(true)}>Add Persona</Button>
                <Button className={classes.backup}>Backups</Button>
            </Box>
        </Drawer>
    )
})