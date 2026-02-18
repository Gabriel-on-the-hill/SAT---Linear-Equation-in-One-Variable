const QUESTIONS_DATA = {
    concept1: {
        title: "Part 1: Pure Algebraic Mechanics",
        practice: [
            {
                id: "9b886541",
                question: "If $3x - 8 = 7$, what is the value of $3x + 8$?",
                options: ["$-1$", "$5$", "$13$", "$23$"],
                correctIndex: 3,
                explanation: "<strong>Choice D is correct.</strong><br>First, solve for $x$:<br>$3x - 8 = 7$<br>$3x = 15$<br>$x = 5$<br>Now, substitute $x=5$ into the target expression:<br>$3(5) + 8 = 15 + 8 = 23$."
            },
            {
                id: "6ac23de7",
                question: "In the equation $\\frac{4x}{5} = 20$, what is the value of $x$?",
                options: ["$25$", "$24$", "$16$", "$15$"],
                correctIndex: 0,
                explanation: "<strong>Choice A is correct.</strong><br>Multiply both sides by 5:<br>$4x = 100$<br>Divide by 4:<br>$x = 25$."
            },
            {
                id: "7a5a74a6",
                question: "If $x$ is the solution to $3(2x - 6) - 11 = 4(x - 3) + 6$, what is the value of $x - 3$?",
                options: ["$\\frac{23}{2}$", "$\\frac{17}{2}$", "$\\frac{15}{2}$", "$-\\frac{15}{2}$"],
                correctIndex: 1,
                explanation: "<strong>Choice B is correct.</strong><br>Expand terms:<br>$6x - 18 - 11 = 4x - 12 + 6$<br>$6x - 29 = 4x - 6$<br>Subtract $4x$ from both sides:<br>$2x - 29 = -6$<br>Add 29:<br>$2x = 23 \\rightarrow x = 11.5$<br>Find $x - 3$:<br>$11.5 - 3 = 8.5 = \\frac{17}{2}$."
            },
            {
                id: "4f669597",
                question: "What value of $p$ is the solution to $2(p + 1) + 8(p - 1) = 5p$?",
                options: ["$1.2$", "$1.5$", "$2$", "$6$"],
                correctIndex: 0,
                explanation: "<strong>Correct Answer: 1.2</strong><br>Distribute:<br>$2p + 2 + 8p - 8 = 5p$<br>Combine like terms:<br>$10p - 6 = 5p$<br>Subtract $10p$:<br>$-6 = -5p$<br>Divide by -5:<br>$p = \\frac{6}{5} = 1.2$."
            },
            {
                id: "ce314070",
                question: "If $4x - \\frac{1}{2} = -5$, what is the value of $8x - 1$?",
                options: ["$2$", "$-\\frac{9}{8}$", "$-\\frac{5}{2}$", "$-10$"],
                correctIndex: 3,
                explanation: "<strong>Choice D is correct.</strong><br>Notice that $8x - 1$ is exactly double $4x - \\frac{1}{2}$.<br>$2(4x - \\frac{1}{2}) = 2(-5)$<br>$8x - 1 = -10$."
            },
            {
                id: "771bd0ca",
                question: "What value of $t$ is the solution to $5(t + 3) - 7(t + 3) = 38$?",
                options: ["$-22$", "$-19$", "$-16$", "$22$"],
                correctIndex: 0,
                explanation: "<strong>Correct Answer: -22</strong><br>Let $u = t+3$.<br>$5u - 7u = 38$<br>$-2u = 38 \\rightarrow u = -19$<br>$t + 3 = -19 \\rightarrow t = -22$."
            },
            {
                id: "9ff10b3b",
                question: "If $\\frac{1}{2}x - \\frac{1}{6}x = 1$, what is the value of $x$?",
                options: ["$-4$", "$\\frac{1}{3}$", "$3$", "$6$"],
                correctIndex: 2,
                explanation: "<strong>Choice C is correct.</strong><br>Find common denominator (6):<br>$\\frac{3}{6}x - \\frac{1}{6}x = 1$<br>$\\frac{2}{6}x = 1$<br>$\\frac{1}{3}x = 1$<br>Multiply by 3: $x = 3$."
            },
            {
                id: "aee9fd2d",
                question: "If $\\frac{x+6}{3} = \\frac{x+6}{13}$, the value of $x + 6$ is between which values?",
                options: ["-7 and -3", "-2 and 2", "2 and 7", "8 and 13"],
                correctIndex: 1,
                explanation: "<strong>Choice B is correct.</strong><br>If a quantity divided by 3 equals the same quantity divided by 13, that quantity MUST be 0.<br>$x + 6 = 0$.<br>0 is between -2 and 2."
            },
            {
                id: "12ee1edc",
                question: "In the equation $(b - 2)x = 8$, $b$ is a constant. If the equation has no solution, what is the value of $b$?",
                options: ["$2$", "$4$", "$6$", "$10$"],
                correctIndex: 0,
                explanation: "<strong>Choice A is correct.</strong><br>For a linear equation to have no solution, the coefficient of $x$ must be 0 (while the other side is non-zero).<br>$b - 2 = 0 \\rightarrow b = 2$."
            },
            {
                id: "25e1cfed",
                question: "How many solutions does the equation $10(15x - 9) = -15(6 - 10x)$ have?",
                options: ["Exactly one", "Exactly two", "Infinitely many", "Zero"],
                correctIndex: 2,
                explanation: "<strong>Choice C is correct.</strong><br>Distribute on both sides:<br>Left: $150x - 90$<br>Right: $-90 + 150x$<br>Since $150x - 90 = 150x - 90$, the equation is true for ALL values of $x$."
            }
        ],
        exam: [
            {
                id: "d9d83c02",
                question: "For what value of $w$ does $w - 10 = 2(w + 5)$?",
                options: ["$5$", "$0$", "$-15$", "$-20$"],
                correctIndex: 3,
                explanation: "<strong>Choice D is correct.</strong><br>$w - 10 = 2w + 10$<br>Subtract $w$: $-10 = w + 10$<br>Subtract 10: $w = -20$."
            },
            {
                id: "3c4ce699",
                question: "If $6 + x = 9$, what is the value of $18 + 3x$?",
                options: ["$27$", "$18$", "$9$", "$3$"],
                correctIndex: 0,
                explanation: "<strong>Choice A is correct.</strong><br>Structure: $18 + 3x$ is exactly $3$ times $6 + x$.<br>$3(6 + x) = 3(9) = 27$."
            },
            {
                id: "7a987ae4",
                question: "If $\\frac{2n}{5} = 10$, what is the value of $2n - 1$?",
                options: ["$24$", "$49$", "$50$", "$99$"],
                correctIndex: 1,
                explanation: "<strong>Choice B is correct.</strong><br>$\\frac{2n}{5} = 10 \\implies 2n = 50$.<br>Then $2n - 1 = 50 - 1 = 49$."
            },
            {
                id: "ce6b52d8",
                question: "If $2(3t - 10) + t = 40 + 4t$, what is the value of $3t$?",
                options: ["$20$", "$60$", "$18$", "$30$"],
                correctIndex: 1,
                explanation: "<strong>Choice B is correct.</strong><br>$6t - 20 + t = 40 + 4t$<br>$7t - 20 = 40 + 4t$<br>$3t - 20 = 40$<br>$3t = 60$."
            },
            {
                id: "620abf36",
                question: "If $5(x + 4) = 4(x + 4) + 29$, what is the value of $x + 4$?",
                options: ["$-4$", "$25$", "$29$", "$33$"],
                correctIndex: 2,
                explanation: "<strong>Choice C is correct.</strong><br>Let $u = x+4$.<br>$5u = 4u + 29$<br>$u = 29$."
            },
            {
                id: "15daa8d6",
                question: "In $2x + 16 = a(x + 8)$, $a$ is a constant. If the equation has infinitely many solutions, what is $a$?",
                options: ["$1$", "$2$", "$4$", "$8$"],
                correctIndex: 1,
                explanation: "<strong>Choice B is correct.</strong><br>$2x + 16 = a(x + 8)$.<br>Right side must match left.<br>$2(x + 8) = 2x + 16$. So $a=2$."
            },
            {
                id: "70e29454",
                question: "$a(3-x) - b = -1 - 2x$. If the equation has infinitely many solutions, what are $a$ and $b$?",
                options: ["$a=2, b=1$", "$a=2, b=7$", "$a=-2, b=5$", "$a=-2, b=-5$"],
                correctIndex: 1,
                explanation: "<strong>Choice B is correct.</strong><br>$3a - ax - b = -1 - 2x$<br>Compare $x$ coeffs: $-a = -2 \\implies a = 2$.<br>Compare constants: $3a - b = -1$<br>$3(2) - b = -1 \\implies 6 - b = -1 \\implies b = 7$."
            },
            {
                id: "e6cb2402",
                question: "$3(kx + 13) = \\frac{48}{17}x + 36$. If no solution, what is $k$?",
                options: ["$16/17$", "$13/17$", "$48$", "$3$"],
                correctIndex: 0,
                explanation: "<strong>Correct Answer: 16/17</strong><br>Expand: $3kx + 39 = \\frac{48}{17}x + 36$.<br>For no solution, slopes must be equal, intercepts different.<br>$3k = \\frac{48}{17} \\implies k = \\frac{16}{17}$."
            },
            {
                id: "3f8a701b",
                question: "$9x + 5 = a(x + b)$, has no solutions. Which must be true?",
                options: ["$a=9, b=5$", "$a=9, b \\neq 5/9$", "$a \\neq 9, b=5$", "$a=9, b=5/9$"],
                correctIndex: 1,
                explanation: "<strong>Choice B is correct.</strong><br>For no solution, slopes equal ($a=9$), intercepts different ($9b \\neq 5 \\implies b \\neq 5/9$)."
            },
            {
                id: "429fb7c0",
                question: "What value of $t$ is the solution to $0.8t - 0.46 = 8(t - 0.001) + 1.9$?",
                options: ["$-0.3267$", "$0.3267$", "$-3.267$", "$3.267$"],
                correctIndex: 0,
                explanation: "<strong>Correct Answer: -0.3267</strong><br>Use backsolving or solve directly. $0.8t - 0.46 = 8t - 0.008 + 1.9$.<br>$0.8t - 0.46 = 8t + 1.892$.<br>$-7.2t = 2.352 \\implies t \\approx -0.3267$."
            }
        ]
    },
    concept2: {
        title: "Part 2: Contextual Applications",
        practice: [
            {
                id: "3d04de9c",
                question: "A principal used a total of 25 flags (blue or yellow). 20 were blue. How many yellow flags were used?",
                options: ["$5$", "$20$", "$25$", "$30$"],
                correctIndex: 0,
                explanation: "<strong>Choice A is correct.</strong><br>Total = Blue + Yellow<br>$25 = 20 + Y$<br>$Y = 5$."
            },
            {
                id: "ed18c4f7",
                question: "Cathy has $n$ CDs. Gerry has 3 more than twice the number of CDs that Cathy has. How many CDs does Gerry have?",
                options: ["$3n - 2$", "$3n + 2$", "$2n - 3$", "$2n + 3$"],
                correctIndex: 3,
                explanation: "<strong>Choice D is correct.</strong><br>\"Twice Cathy\" = $2n$.<br>\"3 more than\" = $+ 3$.<br>Result: $2n + 3$."
            },
            {
                id: "46f68129",
                question: "A librarian has 43 books. Giving each child 2 books leaves 7 left over. How many children are there?",
                options: ["$15$", "$18$", "$25$", "$29$"],
                correctIndex: 1,
                explanation: "<strong>Choice B is correct.</strong><br>Books distributed = Total - Leftover = $43 - 7 = 36$.<br>Children = $36 / 2 = 18$."
            },
            {
                id: "9d4270fe",
                question: "Profit $P = 2.00x - 4,500$ ($x$ = dispensers sold). What is the best interpretation of $2.00x$?",
                options: [
                    "Monthly sales revenue from selling x tape dispensers",
                    "Monthly sales revenue from each tape dispenser sold",
                    "Monthly cost of creating each tape dispenser",
                    "Monthly cost of creating x tape dispensers"
                ],
                correctIndex: 0,
                explanation: "<strong>Choice A is correct.</strong><br>Profit = Revenue - Cost. The positive term $2.00x$ represents the total money coming in (Revenue) from selling $x$ units."
            },
            {
                id: "aa85b138",
                question: "Tree height $2n + 6 = 14$ ($n$ = years). What is the interpretation of 2?",
                options: [
                    "Years to double height",
                    "Average feet grew per year",
                    "Height at 1 year old",
                    "Average years to grow 14 feet"
                ],
                correctIndex: 1,
                explanation: "<strong>Choice B is correct.</strong><br>This is the slope (rate of change). The tree adds 2 feet for every 1 unit of time ($n$)."
            },
            {
                id: "b7e6394d",
                options: ["$\\frac{25}{4}m = 95$", "$\\frac{25}{4}m = 5$", "$\\frac{4}{25}m = 95$", "$\\frac{4}{25}m = 5$"],
                correctIndex: 3,
                explanation: "<strong>Choice D is correct.</strong><br>Cost per mile = $\\frac{\\text{Price per gal}}{\\text{Miles per gal}} = \\frac{4}{25}$ dollars/mile.<br>Savings = (Cost per mile) × (Miles).<br>$\\frac{4}{25}m = 5$."
            },
            {
                id: "feb78194",
                question: "Revenue = &#36;14/tablet. Wednesday Profit = &#36;406. Expenses = &#36;112. How many tablets ($x$) were rented?",
                options: ["$21$", "$29$", "$37$", "$40$"],
                correctIndex: 2,
                explanation: "<strong>Correct Answer: 37</strong><br>Profit = Revenue - Expenses<br>$406 = 14x - 112$<br>$518 = 14x$<br>$x = 37$."
            },
            {
                id: "36ab4122",
                question: "Wage $p$ for first 8 hours. $1.5p$ for excess. Worked 10 hours, earned $137.50. What is $p$?",
                options: ["$11.75$", "$12.50$", "$13.25$", "$13.75$"],
                correctIndex: 1,
                explanation: "<strong>Choice B is correct.</strong><br>Total Pay = (8 hours × $p$) + (2 hours × $1.5p$)<br>$137.50 = 8p + 3p = 11p$<br>$p = 137.50 / 11 = 12.50$."
            },
            {
                id: "2937ef4f",
                question: "Bin had 24,000 bushels. After 5 hours, 19,350 remained. Rate is constant. How many total hours until 12,840 remain?",
                options: ["$3$", "$7$", "$8$", "$12$"],
                correctIndex: 3,
                explanation: "<strong>Choice D is correct.</strong><br>Start: 24,000. 5 hrs later: 19,350.<br>Removed: $24,000 - 19,350 = 4,650$ in 5 hrs.<br>Rate = $4,650 / 5 = 930$ per hour.<br>Target removal: $24,000 - 12,840 = 11,160$.<br>Time = $11,160 / 930 = 12$ hours."
            },
            {
                id: "f14484a5",
                question: "Pan factory: 9-inch pans ($n$). 10-inch pans ($4n$). 7-inch pans ($10$). Total = 100. Which equation?",
                options: [
                    "$10(4n) + 9n + 7(10) = 100$",
                    "$10n + 9n + 7n = 100$",
                    "$4n + 10 = 100$",
                    "$5n + 10 = 100$"
                ],
                correctIndex: 3,
                explanation: "<strong>Choice D is correct.</strong><br>Sum of counts = 100.<br>Count of 10-inch ($4n$) + Count of 9-inch ($n$) + Count of 7-inch ($10$) = 100.<br>$5n + 10 = 100$."
            }
        ],
        exam: [
            {
                id: "93954cfa",
                question: "One pound of grapes costs &#36;2. How many dollars will $c$ pounds cost?",
                options: ["$2c$", "$2+c$", "$\\frac{2}{c}$", "$\\frac{c}{2}$"],
                correctIndex: 0,
                explanation: "<strong>Choice A is correct.</strong><br>Cost = Price × Quantity = $2 \\times c = 2c$."
            },
            {
                id: "f09097b1",
                question: "Corn plant grows 1.20 cm/day for 12 days. Final height is 36.8 cm. What was initial height?",
                options: ["$14.4$", "$22.4$", "$36.8$", "$51.2$"],
                correctIndex: 1,
                explanation: "<strong>Correct Answer: 22.4</strong><br>Growth = $1.20 \\times 12 = 14.4$.<br>Initial = Final - Growth = $36.8 - 14.4 = 22.4$."
            },
            {
                id: "5ad9eff0",
                question: "Dance floor width $w$. Length is 6 feet longer than width. What is the perimeter?",
                options: ["$2w+6$", "$4w+12$", "$w^2+6$", "$w^2+6w$"],
                correctIndex: 1,
                explanation: "<strong>Choice B is correct.</strong><br>Length $l = w + 6$.<br>Perimeter $P = 2w + 2l = 2w + 2(w+6) = 2w + 2w + 12 = 4w + 12$."
            },
            {
                id: "628300a9",
                question: "5 science stations. $x$ have Experiment A (6 salt). Remaining have Experiment B (4 salt). Total salt expression?",
                options: ["$5x$", "$10x$", "$2x+20$", "$10x+20$"],
                correctIndex: 2,
                explanation: "<strong>Choice C is correct.</strong><br>Stations A: $x$ (6 salt each) $\\rightarrow 6x$.<br>Stations B: $5-x$ (4 salt each) $\\rightarrow 4(5-x) = 20 - 4x$.<br>Total = $6x + 20 - 4x = 2x + 20$."
            },
            {
                id: "76f29fa5",
                question: "Boat rent: &#36;950 for first 2 hours. &#36;50/hour after. Total &#36;1,100. Total hours $t$. Which equation?",
                options: ["$950(t-2)+50t=1100$", "$950(2t)+50t=1100$", "$950+50(t-2)=1100$", "$950+50(2t)=1100$"],
                correctIndex: 2,
                explanation: "<strong>Choice C is correct.</strong><br>Base cost: 950 (covers 2 hours).<br>Extra hours: $t - 2$.<br>Extra cost: $50(t-2)$.<br>Total: $950 + 50(t-2) = 1100$."
            },
            {
                id: "8c515062",
                question: "Candle: 17 oz wax. Burns 1 oz every 4 hours. 6 oz remain. How many hours ($h$) burned?",
                options: ["$3$", "$6$", "$24$", "$44$"],
                correctIndex: 3,
                explanation: "<strong>Choice D is correct.</strong><br>Lost wax: $17 - 6 = 11$ oz.<br>Rate: 1 oz per 4 hours.<br>Time = $11 \\times 4 = 44$ hours."
            }
        ]
    }
};

window.QUESTIONS = QUESTIONS_DATA;
