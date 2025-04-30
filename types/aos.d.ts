declare module "aos" {
  export interface AOSOptions {
    offset?: number;
    delay?: number;
    duration?: number;
    easing?: string;
    once?: boolean;
    mirror?: boolean;
    anchorPlacement?: string;
    disable?: string | boolean;
    startEvent?: string;
    animatedClassName?: string;
    initClassName?: string;
    useClassNames?: boolean;
    disableMutationObserver?: boolean;
  }

  export interface AOS {
    init(options?: AOSOptions): void;
    refresh(hard?: boolean): void;
    refreshHard(): void;
  }

  const aos: AOS;
  export default aos;
}

interface Window {
  AOS: import("aos").AOS;
}
