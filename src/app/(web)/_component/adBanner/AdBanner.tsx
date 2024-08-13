import Image from "next/image";
import * as css from "./adBanner.css";

export default function AdBanner() {
  return (
    <div className={css.wrap}>
      <iframe
        src="https://ads-partners.coupang.com/widgets.html?id=800060&template=carousel&trackingCode=AF9310934&subId=&width=680&height=140&tsource="
        width="680"
        height="140"
        referrerPolicy="unsafe-url"
      ></iframe>
    </div>
  );
}
