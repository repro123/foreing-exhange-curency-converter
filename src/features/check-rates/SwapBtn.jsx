import { Button } from "@/components/ui/button";
import HorizontalIconExchange from "@/components/SVGs/HorizontalIconExchange";
import VerticalExchangeIcon from "@/components/SVGs/VerticalExchangeIcon";

function SwapBtn() {
  return (
    <Button variant="secondary" size="lg">
      <HorizontalIconExchange className="hidden md:block" />
      <VerticalExchangeIcon className="md:hidden block" />
    </Button>
  );
}

export default SwapBtn;
