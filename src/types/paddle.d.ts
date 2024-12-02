declare global {
    interface Paddle {
      Environment: {
        set(env: "sandbox" | "production"): void;
      };
      Setup(options: { vendor: number }): void;
      Checkout: {
        open(options: { product: number }): void;
      };
    }
  
    const Paddle: Paddle;
  }
  
  export { };
  