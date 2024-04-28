"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export default function Layout({ children, details }) {
  return (
    <PanelGroup direction="horizontal">
      <Panel id="master" order={1} defaultSize={5}>
        <div className="h-full overflow-auto">{children}</div>
      </Panel>

      <PanelResizeHandle className="flex items-stretch justify-stretch">
        <div className="my-2 w-2 rounded-full bg-gray-50 transition-colors hover:bg-gray-100"></div>
      </PanelResizeHandle>

      <Panel id="details" order={2} defaultSize={5}>
        <div className="overflow-auto">{details}</div>
      </Panel>
    </PanelGroup>
  );
}
