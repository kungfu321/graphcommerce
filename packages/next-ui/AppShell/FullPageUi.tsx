import { makeStyles, Theme } from '@material-ui/core'
import { m as motion, MotionProps } from 'framer-motion'
import { UiFC } from '../PageTransition/types'
import usePageTransition from '../PageTransition/usePageTransition'

const useStyles = makeStyles(
  (theme: Theme) => ({
    content: {
      marginTop: `calc(${theme.page.headerInnerHeight.xs} + ${theme.page.vertical})`,
      [theme.breakpoints.up('md')]: {
        marginTop: `calc(${theme.page.headerInnerHeight.sm} + ${theme.page.vertical} * 2)`,
      },
    },
  }),
  { name: 'LayoutHeader' },
)

export type FullPageUiProps = unknown

const FullPageUi: UiFC<FullPageUiProps> = (props) => {
  const { children, title } = props
  const classes = useStyles(props)
  const { offsetDiv, inFront, hold } = usePageTransition({ title })

  const contentAnimation: MotionProps = !hold
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { type: 'tween' } },
        exit: { opacity: 0, transition: { type: 'tween' } },
      }
    : {
        initial: { opacity: 1 },
        animate: { opacity: 1, transition: { duration: 0 } },
        exit: { opacity: 1, transition: { duration: 0 } },
      }

  return (
    <>
      <motion.div {...offsetDiv}>
        <motion.div
          className={classes.content}
          style={{ pointerEvents: inFront ? 'all' : 'none' }}
          {...contentAnimation}
        >
          {children}
        </motion.div>
      </motion.div>
    </>
  )
}
FullPageUi.holdBackground = false

export default FullPageUi