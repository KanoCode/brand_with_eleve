type Param = {
  params: {
    item: string;
  };
  action: string;
};

export const pageview = (url: string) => {

  if (window !== undefined) {
    // @ts-ignore

    window.gtag("config", "G-VX454WXPQD", {
      page_path: url,
    });
  }
};

export const event = ({ action, params }: Param) => {
  if (window !== undefined) {
    // @ts-ignore

    window.gtag("event", action, params);
  }
};
