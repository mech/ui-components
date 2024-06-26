"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useParams, useSearchParams } from "next/navigation";
import { Fragment, Suspense } from "react";
import RaceBy from "@/components/RaceBy";

export default function PanelContainer2({ master, details = null }) {
  const searchParams = useSearchParams();
  const params = useParams();
  const currentPage = searchParams.get("page");

  return (
    <PanelGroup direction="horizontal">
      <Panel id="master" order={1} defaultSize={params.id ? 60 : 100}>
        <div className="h-full overflow-auto">{master}</div>
      </Panel>

      {params.id && (
        <Fragment>
          <PanelResizeHandle className="flex items-stretch justify-stretch">
            <div className="my-2 w-2 rounded-full bg-border/50 transition-colors hover:bg-border"></div>
          </PanelResizeHandle>

          <Panel
            id="details"
            order={2}
            defaultSize={40}
            minSize={30}
            maxSize={90}
          >
            <div className="relative h-full overflow-auto">
              <Suspense key={params.id + currentPage} fallback={<Loading />}>
                {details}
              </Suspense>
            </div>
          </Panel>
        </Fragment>
      )}
    </PanelGroup>
  );
}

const Loading = () => {
  return (
    <div className="absolute inset-x-0 top-32 z-50 flex items-center justify-center">
      <div className="w-[100px] rounded-full border bg-gray-100 p-4 shadow-2xl">
        <RaceBy />
      </div>
    </div>
  );
};
