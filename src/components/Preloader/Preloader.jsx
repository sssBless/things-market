import preloader from '../../images/preloader.gif';
import classes from './style.module.css';

export default function Preloader() {
  return (
    <div className={classes.Preloader}>
      <img src={preloader} alt='preloader' />
      Loading...
    </div>
  );
}
