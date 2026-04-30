"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const CONTRACTS_PATH = "/franchise-dashboard/set/contracts";

const CLOSE_ICON = "/franchise-dashboard-set/modal-close.svg";

export function CongratsLeadsModal() {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onMq = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const goToContracts = useCallback(() => {
    close();
    router.push(CONTRACTS_PATH);
  }, [close, router]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  if (!open) return null;

  const backdropAnim = reduceMotion ? "opacity-100" : "opacity-0 animate-set-congrats-backdrop";
  const modalAnim = reduceMotion ? "opacity-100" : "opacity-0 animate-set-congrats-modal";

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4" role="presentation">
      {/* Backdrop */}
      <div className={`absolute inset-0 bg-black/50 ${backdropAnim}`} aria-hidden onClick={close} />

      {/* Dialog — Figma 529:16549 */}
      <div
        role="dialog"
        aria-modal
        aria-labelledby="set-congrats-title"
        className={`relative mx-auto w-[min(100vw-2rem,512px)] max-w-[512px] shrink-0 ${modalAnim}`}
        style={reduceMotion ? { opacity: 1 } : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative rounded-[16px] border border-solid border-[#e6e6e7] bg-white shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)]"
          data-node-id="529:16549"
          data-name="Container"
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            data-node-id="529:16563"
            data-name="Button"
            className="absolute right-[19px] top-[16px] flex size-[32px] shrink-0 items-center justify-center rounded-[10px] px-2 hover:bg-black/[0.04] active:bg-black/[0.06]"
          >
            <span className="relative size-[16px] shrink-0 overflow-hidden">
              <img alt="" src={CLOSE_ICON} width={16} height={16} className="block size-full max-h-none max-w-none" />
            </span>
          </button>

          {/* Emoji — Figma: 64px row, centered in 448px content */}
          <div
            data-node-id="529:16550"
            data-name="Container"
            className="flex min-h-[64px] w-full justify-center px-8 pb-6 pt-8"
          >
            <p className="shrink-0 text-center font-['Inter',sans-serif] text-[54px] font-bold leading-none text-[#262527]" data-node-id="529:16567" aria-hidden>
              🎉
            </p>
          </div>

          {/* Title */}
          <div data-node-id="529:16554" className="w-full px-8">
            <h2
              id="set-congrats-title"
              data-node-id="529:16555"
              className="text-center font-['Inter',sans-serif] text-[24px] font-bold leading-[32px] text-[#262527]"
            >
              Congratulations!{" "}
            </h2>
          </div>

          {/* Body */}
          <div data-node-id="529:16556" className="w-full px-8 pt-4">
            <p
              data-node-id="529:16557"
              className="mx-auto max-w-[448px] text-center font-['Inter',sans-serif] text-[16px] font-normal leading-[26px] text-[#5b5b5f]"
            >
              <span>{`A new lot has been added - you now have `}</span>
              <span className="font-bold text-[#146dff]">{`3,000 new leads `}</span>
              <span>{`to explore. This is a great opportunity to expand your pipeline.`}</span>
            </p>
            <p className="mx-auto mt-3 max-w-[448px] text-center font-['Inter',sans-serif] text-[16px] font-normal leading-[26px] text-[#5b5b5f]">
              <span className="font-bold text-[#146dff]">{`7 contracts`}</span>
              {` are also migrated to this franchise and will need customer signature`}
            </p>
          </div>

          {/* Primary CTA */}
          <div className="flex w-full justify-center px-8 pb-8 pt-8">
            <button
              type="button"
              data-node-id="529:16561"
              data-name="Button"
              onClick={goToContracts}
              className="relative flex h-[52px] w-full max-w-[382px] cursor-pointer shrink-0 items-center justify-center rounded-[10px] bg-[#146dff] px-4 shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] transition-colors hover:bg-[#125fdc] active:bg-[#0f53c4]"
            >
              <span
                data-node-id="529:16562"
                className="font-['Inter',sans-serif] text-[16px] font-semibold leading-[24px] text-white"
              >
                View Contracts
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
