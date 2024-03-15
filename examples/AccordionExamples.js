import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";

const AccordionExamples = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="border-b p-2 hover:bg-sky-50">
          Accordion 1
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 px-2 py-2">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Assumenda commodi cum cupiditate ducimus eaque earum fugiat,
              impedit magnam nisi nostrum obcaecati odio officia, pariatur quod
              repellat
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
              commodi cumque earum eligendi et facere iste libero minima modi
              nihil officia officiis, quae repudiandae sequi tempore, totam vel
              velit voluptates!
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Accusamus consectetur fugit harum minus modi, natus obcaecati
              perferendis qui suscipit ullam. Aspernatur cum magnam nulla vel!
              Nam rerum sunt tempore voluptatum.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="border-b p-2 hover:bg-yellow-50">
          Accordion 2
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 px-2 py-2">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Assumenda commodi cum cupiditate ducimus eaque earum fugiat,
              impedit magnam nisi nostrum obcaecati odio officia, pariatur quod
              repellat
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
              commodi cumque earum eligendi et facere iste libero minima modi
              nihil officia officiis, quae repudiandae sequi tempore, totam vel
              velit voluptates!
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="border-b p-2 hover:bg-rose-50">
          Accordion 3
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 px-2 py-2">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Assumenda commodi cum cupiditate ducimus eaque earum fugiat,
              impedit magnam nisi nostrum obcaecati odio officia, pariatur quod
              repellat
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
              commodi cumque earum eligendi et facere iste libero minima modi
              nihil officia officiis, quae repudiandae sequi tempore, totam vel
              velit voluptates!
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionExamples;
