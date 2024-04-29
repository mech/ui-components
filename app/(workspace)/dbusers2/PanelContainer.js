"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { PendingContext } from "@/app/(workspace)/dbusers2/PendingContext";
import UrqlProvider from "@/app/(workspace)/fetch-examples/UrqlProvider";

export default function PanelContainer({ master, details = null }) {
  const [panelPending, setIsPanelPending] = useState(false);
  const searchParams = useSearchParams();

  const pick = searchParams.get("pick");

  const dataPending = (pending) => {
    return pending ? "" : undefined;
  };

  return (
    <PanelGroup direction="horizontal" className="group">
      <Panel id="master" order={1} defaultSize={pick ? 60 : 100}>
        <PendingContext.Provider value={{ setIsPanelPending }}>
          <div className="h-full overflow-auto">{master}</div>
        </PendingContext.Provider>
      </Panel>

      {pick && (
        <>
          <PanelResizeHandle className="flex items-stretch justify-stretch">
            <div className="my-2 w-2 rounded-full bg-gray-50 transition-colors hover:bg-gray-100"></div>
          </PanelResizeHandle>

          <Panel
            id="details"
            order={2}
            defaultSize={40}
            minSize={30}
            data-panel-pending={dataPending(panelPending)}
            className="data-[panel-pending]:opacity-50"
          >
            <div className="h-full overflow-auto">
              <UrqlProvider>{details}</UrqlProvider>

              {/*<Suspense*/}
              {/*  fallback={*/}
              {/*    <div className="grid h-full place-content-center">*/}
              {/*      Loading...*/}
              {/*    </div>*/}
              {/*  }*/}
              {/*>*/}
              {/*  {details}*/}
              {/*</Suspense>*/}
            </div>
          </Panel>
        </>
      )}
    </PanelGroup>
  );
}
