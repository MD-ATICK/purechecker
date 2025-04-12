import BanMessage from "./ban-message";
import VerifyAccountMessage from "./verify-account-message";

export default function AdditionalMessage(props: {
  verified: boolean;
  banned: boolean;
  email: string;
}) {
  return (
    <div className=" fixed top-20 w-full z-50">
      {!props.verified && <VerifyAccountMessage email={props.email} />}
      {props.banned && <BanMessage />}
    </div>
  );
}
