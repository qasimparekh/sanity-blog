"use client";

import dynamic from "next/dynamic";

// Re-exported components using next/dynamic ensures they're not bundled
// and sent to the browser unless actually used, with draftMode().enabled.

//? render the same blogList component but with more data including drafts
export default dynamic(() => import("./BlogList"));
