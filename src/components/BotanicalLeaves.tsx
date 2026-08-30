type LeafProps = {
  transform: string
}

function Leaf({ transform }: LeafProps) {
  return (
    <g transform={transform}>
      <path
        className="botanical-leaf"
        d="M0 0C-17-18-20-48-2-70C2-75 5-75 9-70C27-47 21-17 0 0Z"
      />
    </g>
  )
}

export default function BotanicalLeaves() {
  return (
    <svg
      className="botanical-leaves"
      viewBox="0 0 1200 520"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g className="botanical-branch botanical-branch-left">
        <g>
          <g className="botanical-sway">
            <path className="botanical-stem" d="M30 545C44 423 95 312 184 207C235 147 287 96 347 43" />
            <g className="botanical-secondary">
              <path className="botanical-stem botanical-twig" d="M76 367C54 338 40 307 36 274" />
              <Leaf transform="translate(38 277) rotate(-53) scale(.82)" />
              <Leaf transform="translate(73 364) rotate(-67) scale(.94)" />
            </g>
            <g className="botanical-secondary">
              <path className="botanical-stem botanical-twig" d="M111 300C145 292 174 273 197 244" />
              <Leaf transform="translate(198 245) rotate(54) scale(.82)" />
            </g>
            <g className="botanical-secondary">
              <path className="botanical-stem botanical-twig" d="M153 239C134 208 127 180 130 154" />
              <Leaf transform="translate(130 157) rotate(-45) scale(.72)" />
              <Leaf transform="translate(154 239) rotate(-62) scale(.86)" />
            </g>
            <g className="botanical-secondary">
              <path className="botanical-stem botanical-twig" d="M202 185C239 178 269 160 292 132" />
              <Leaf transform="translate(292 133) rotate(49) scale(.74)" />
            </g>
            <g className="botanical-secondary">
              <path className="botanical-stem botanical-twig" d="M255 125C244 99 242 77 247 57" />
              <Leaf transform="translate(248 59) rotate(-34) scale(.64)" />
            </g>
            <Leaf transform="translate(347 44) rotate(37) scale(.68)" />
          </g>
        </g>
      </g>

      <g className="botanical-branch botanical-branch-right">
        <g>
          <g className="botanical-sway">
            <path className="botanical-stem" d="M1175 545C1159 430 1117 327 1033 222C982 158 929 106 862 50" />
            <g className="botanical-secondary">
              <path className="botanical-stem botanical-twig" d="M1135 387C1155 357 1168 326 1172 291" />
              <Leaf transform="translate(1171 293) rotate(52) scale(.8)" />
              <Leaf transform="translate(1136 387) rotate(66) scale(.91)" />
            </g>
            <g className="botanical-secondary">
              <path className="botanical-stem botanical-twig" d="M1100 316C1065 305 1038 286 1017 258" />
              <Leaf transform="translate(1017 259) rotate(-55) scale(.8)" />
            </g>
            <g className="botanical-secondary">
              <path className="botanical-stem botanical-twig" d="M1054 256C1076 225 1084 197 1082 170" />
              <Leaf transform="translate(1082 172) rotate(44) scale(.7)" />
              <Leaf transform="translate(1054 256) rotate(61) scale(.84)" />
            </g>
            <g className="botanical-secondary">
              <path className="botanical-stem botanical-twig" d="M1004 188C969 181 941 163 918 137" />
              <Leaf transform="translate(918 138) rotate(-49) scale(.72)" />
            </g>
            <Leaf transform="translate(862 51) rotate(-38) scale(.66)" />
          </g>
        </g>
      </g>
    </svg>
  )
}
