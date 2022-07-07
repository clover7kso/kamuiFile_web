export const mSend = () => {
  window.gtag("event", "conversion", {
    send_to: "AW-926575077/UXHPCPa7_soDEOXT6bkD",
    value: 1.0,
    currency: "KRW",
    event_callback: () => {
      if (typeof url != "undefined") {
        window.location = url;
      }
    },
  });
  window.gtag("event", "file_send");
};

export const mRecv = () => {
  window.gtag("event", "conversion", {
    send_to: "AW-926575077/J7msCJDfysoDEOXT6bkD",
    value: 1.0,
    currency: "KRW",
    event_callback: () => {
      if (typeof url != "undefined") {
        window.location = url;
      }
    },
  });
  window.gtag("event", "file_recv");
};

export const mCompress = () => {
  window.gtag("event", "conversion", {
    send_to: "AW-926575077/sU5PCI-ay8oDEOXT6bkD",
    value: 1.0,
    currency: "KRW",
    event_callback: () => {
      if (typeof url != "undefined") {
        window.location = url;
      }
    },
  });
  window.gtag("event", "img_compress");
};

export const mConvert = () => {
  window.gtag("event", "conversion", {
    send_to: "AW-926575077/tuPfCKejy8oDEOXT6bkD",
    value: 1.0,
    currency: "KRW",
    event_callback: () => {
      if (typeof url != "undefined") {
        window.location = url;
      }
    },
  });
  window.gtag("event", "img_convert");
};

export const mResize = () => {
  window.gtag("event", "conversion", {
    send_to: "AW-926575077/ZYF2CP-zy8oDEOXT6bkD",
    value: 1.0,
    currency: "KRW",
    event_callback: () => {
      if (typeof url != "undefined") {
        window.location = url;
      }
    },
  });
  window.gtag("event", "img_resize");
};
