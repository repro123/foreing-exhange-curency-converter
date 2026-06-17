import { Button } from "@/components/ui/button";
import HorizontalExchange from "@/assets/images/icon-exchange.svg";
import VerticalExchange from "@/assets/images/icon-exchange-vertical.svg";

function SwapBtn() {
  return (
    <Button variant="secondary" size="lg">
      <picture>
        <source media="(min-width: 768px)" srcSet={HorizontalExchange.src} />
        <img src={VerticalExchange.src} alt="Swap currencies" />
      </picture>
    </Button>
  );
}

export default SwapBtn;
