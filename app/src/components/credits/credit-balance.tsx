interface CreditBalanceProps {
  balance: number;
}

export function CreditBalance({ balance }: CreditBalanceProps) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg rounded-xl bg-gradient-to-br from-primary to-blue-700 p-10 text-center text-white shadow-lg">
        <p className="text-6xl font-bold">{balance.toLocaleString()}</p>
        <p className="mt-2 text-lg opacity-90">credits remaining</p>
        <p className="mt-1 text-sm opacity-75">
          ~120-400 images (depending on AI service)
        </p>
        <span className="mt-4 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs">
          &#8734; Credits never expire
        </span>
      </div>
    </div>
  );
}
