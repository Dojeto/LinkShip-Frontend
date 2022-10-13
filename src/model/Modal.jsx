import styles from "./Model.module.scss"
import { motion } from "framer-motion";
import {FaTimes} from "react-icons/fa"

function Modal({ close, title, children, ...rest }) {
  return (
    <div className={styles.drawerBg} {...rest}>
      <motion.div
        className={styles.drawer}
        initial={{ opacity: 0, y:100 }}
        animate={{
          opacity: 1,
          y: 0,
          
        }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.6 } }}
      >
        <div className={styles.heading}>
          <h3>{title}</h3>
          <div className={styles.cross} onClick={close}>
            <FaTimes/>
          </div>
        </div>
       
        <div className={styles.children}>{children}</div>
      </motion.div>
      <div className={styles.closeBg} onClick={close} />
    </div>
  );
}

export default Modal;