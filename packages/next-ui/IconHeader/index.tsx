import { makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { ObjectImage } from '../../image'
import responsiveVal from '../Styles/responsiveVal'
import SvgImage from '../SvgImage'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      textAlign: 'center',
      fontSize: responsiveVal(16, 24),
      marginTop: theme.spacings.sm,
      marginBottom: theme.spacings.sm,
    },
    innerContainer: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      [theme.breakpoints.up('md')]: {
        display: 'unset',
      },
    },
  }),
  { name: 'IconHeader' },
)

export type IconHeaderSize = 'small' | 'medium' | 'large'

type IconHeaderProps = {
  title: string
  size?: IconHeaderSize
} & Pick<ObjectImage, 'src' | 'alt'>

export type IconHeaderHeadings = 'h6' | 'h5' | 'h3'

export default function IconHeader(props: IconHeaderProps) {
  const { title, ...svgImageProps } = props
  const classes = useStyles()

  const size = 'large'

  const variants: Record<IconHeaderSize, IconHeaderHeadings> = {
    small: 'h6',
    medium: 'h5',
    large: 'h3',
  }

  const iconSizes = {
    small: 32,
    medium: 48,
    large: 64,
  }

  const iconMobileSizes = {
    small: 16,
    medium: 32,
    large: 40,
  }

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <SvgImage
          {...svgImageProps}
          size={iconSizes[size]}
          mobileSize={iconMobileSizes[size]}
          loading='eager'
        />
        <Typography variant={variants[size]} component='h2'>
          {title}
        </Typography>
      </div>
    </div>
  )
}
