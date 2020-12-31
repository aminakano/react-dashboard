import React, { useEffect } from "react";
import styles from "./EmbedTwitter.module.css";

const EmbedTwitter = ({ id, name }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    document.getElementsByClassName("twitter-embed")[0].appendChild(script);
  }, []);

  return (
    <section className="">
      <div className={`twitter-embed ${styles.embed}`}>
        <a
          className="twitter-timeline"
          data-tweet-limit="5"
          data-chrome="noheader nofooter noborders"
          href={`https://twitter.com/${id}`}
        >
          Tweets by {name}
        </a>
      </div>
    </section>
  );
};

export default EmbedTwitter;