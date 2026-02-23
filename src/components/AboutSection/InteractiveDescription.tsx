import React, { useState } from "react";

interface InteractiveDescriptionProps {
    text: string;
}

const Paragraph: React.FC<{ text: string }> = ({ text }) => {
    // Keep track of which pills are clicked inside this paragraph
    const [activePills, setActivePills] = useState<Set<number>>(new Set());

    const togglePill = (index: number) => {
        setActivePills((prev) => {
            const next = new Set(prev);
            if (next.has(index)) {
                next.delete(index);
            } else {
                next.add(index);
            }
            return next;
        });
    };

    // Split by [PILL]
    const tokens = text.split(/(\[[^\]]+\])/g);

    return (
        <p className="whitespace-pre-wrap leading-relaxed mb-4 last:mb-0">
            {tokens.map((token, index) => {
                if (!token) return null;

                if (token.startsWith("[") && token.endsWith("]")) {
                    // Pill keyword
                    const content = token.slice(1, -1);
                    const isActive = activePills.has(index);
                    return (
                        <span
                            key={index}
                            onClick={() => togglePill(index)}
                            className={`inline-flex items-center justify-center px-3 py-0.5 mx-1 -translate-y-[1px] cursor-pointer rounded-full border transition-all duration-300 text-[13px] font-bold tracking-widest uppercase ${isActive
                                ? "border-foreground bg-foreground/10 text-foreground"
                                : "border-foreground/30 hover:border-foreground/60 text-foreground/70"
                                }`}
                        >
                            {content}
                        </span>
                    );
                }

                // Normal text piece
                // Find the nearest preceding pill index to decide if this text is revealed
                let nearestPillIndex = -1;
                for (let i = index - 1; i >= 0; i--) {
                    if (tokens[i].startsWith("[") && tokens[i].endsWith("]")) {
                        nearestPillIndex = i;
                        break;
                    }
                }

                // If there's no pill before this text, it's the start of the paragraph -> clear
                // If there is a pill, it is revealed only if that specific pill is active
                const isRevealed = nearestPillIndex === -1 ? true : activePills.has(nearestPillIndex);

                return (
                    <span
                        key={index}
                        onClick={() => nearestPillIndex !== -1 && togglePill(nearestPillIndex)}
                        className={`transition-all duration-500 ease-in-out cursor-pointer ${isRevealed
                            ? "blur-none opacity-100"
                            : "blur-[5px] opacity-40 hover:opacity-60"
                            }`}
                    >
                        {token}
                    </span>
                );
            })}
        </p>
    );
};

export const InteractiveDescription: React.FC<InteractiveDescriptionProps> = ({ text }) => {
    // Split the full text into paragraphs
    const paragraphs = text.split("\n\n");

    return (
        <div className="text-muted-foreground text-sm sm:text-[15px] max-w-3xl">
            {paragraphs.map((paragraph, index) => (
                <Paragraph key={index} text={paragraph} />
            ))}
        </div>
    );
};
