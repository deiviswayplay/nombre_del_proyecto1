import ImagesForm from "../components/images-form";
import Styles from "../components/login-form.module.css";

export default function Page() {
  return (
    <div className={Styles.background}>
      <ImagesForm />
    </div>
  );
}