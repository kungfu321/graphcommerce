import { makeStyles, Theme, Typography, TypographyProps } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    heading: {
      marginBottom: `calc(${theme.spacings.xxs} * -1)`,
      marginTop: theme.spacings.xxs,
    },
  }),
  { name: 'FormHeader' },
)

export type FormHeaderProps = TypographyProps &
  UseStyles<typeof useStyles> & { children: React.ReactNode }

export default function FormHeader(props: FormHeaderProps) {
  const { children, ...typographyProps } = props
  const classes = useStyles(props)

  return (
    <Typography {...typographyProps} className={classes.heading}>
      {children}
    </Typography>
  )
}