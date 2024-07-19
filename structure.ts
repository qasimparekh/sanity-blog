//? this file can be used to configure live preview within sanity studio

import { Iframe } from "sanity-plugin-iframe-pane";
import type { DefaultDocumentNodeResolver } from "sanity/desk";

export const getDefaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  if (schemaType === "post") { //? which schema type needs to be previewed
    console.log(S)
    return S.document().views([
      S.view.form(),

      S.view
        .component(Iframe)
        .options({
          url: `${
            process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000" //? url of site which needs to be previewed
          }/api/draft`,
          defaultSize: "desktop",
          reload: {
            button: true,
          },
          attributes: {},
        })
        .title("Preview"),
    ]);
  }
};
