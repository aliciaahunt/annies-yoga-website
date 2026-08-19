import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

type LeafProps = {
  transform: string
}

function Leaf({ transform }: LeafProps) {
  return (
    <g transform={transform}>
      <path
        className="botanical-leaf"
        data-botanical-leaf
        d="M0 0C-17-18-20-48-2-70C2-75 5-75 9-70C27-47 21-17 0 0Z"
      />
    </g>
  )
}

export default function BotanicalLeaves() {
  const svgRef = useRef<SVGSVGElement>(null)

  useLayoutEffect(() => {
    if (typeof window.matchMedia !== 'function') return

    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.utils.toArray<SVGGElement>('[data-botanical-drift]').forEach((branch, index) => {
          const direction = index === 0 ? 1 : -1
          gsap.timeline({ repeat: -1 })
            .to(branch, { x: 28 * direction, y: -15, duration: 4.2, ease: 'sine.inOut' })
            .to(branch, { x: 10 * direction, y: 9, duration: 3.8, ease: 'sine.inOut' })
            .to(branch, { x: 0, y: 0, duration: 4.4, ease: 'sine.inOut' })
        })

        gsap.utils.toArray<SVGGElement>('[data-botanical-sway]').forEach((branch, index) => {
          const direction = index === 0 ? 1 : -1
          gsap.set(branch, { svgOrigin: branch.dataset.botanicalOrigin })
          gsap.timeline({ repeat: -1, delay: index === 0 ? -6 : -13 })
            .to(branch, { rotation: 2.8 * direction, duration: 5.2, ease: 'sine.inOut' })
            .to(branch, { rotation: -1.5 * direction, duration: 4.5, ease: 'sine.inOut' })
            .to(branch, { rotation: 0, duration: 5.5, ease: 'sine.inOut' })
        })

        gsap.utils.toArray<SVGGElement>('[data-botanical-secondary]').forEach((stem, index) => {
          const direction = index % 2 === 0 ? 1 : -1
          const amount = 2 + (index % 3) * .65
          const duration = 3.7 + (index % 4) * .55
          gsap.set(stem, { svgOrigin: stem.dataset.botanicalOrigin })
          gsap.timeline({ repeat: -1, delay: -(index * 1.37) })
            .to(stem, { rotation: amount * direction, duration, ease: 'sine.inOut' })
            .to(stem, { rotation: amount * -.55 * direction, duration: duration * .82, ease: 'sine.inOut' })
            .to(stem, { rotation: 0, duration: duration * .76, ease: 'sine.inOut' })
        })

        gsap.utils.toArray<SVGPathElement>('[data-botanical-leaf]').forEach((leaf, index) => {
          const direction = index % 2 === 0 ? 1 : -1
          const amount = 1.5 + (index % 5) * .45
          const duration = 2.6 + (index % 4) * .4
          gsap.timeline({ repeat: -1, delay: -(index * .73) })
            .to(leaf, { rotation: amount * direction, x: 1.2 * direction, duration, ease: 'sine.inOut' })
            .to(leaf, { rotation: amount * -.7 * direction, x: -.8 * direction, duration: duration * .88, ease: 'sine.inOut' })
            .to(leaf, { rotation: 0, x: 0, duration: duration * .74, ease: 'sine.inOut' })
        })
      }, svgRef)

      return () => context.revert()
    })

    return () => media.revert()
  }, [])

  return (
    <svg
      ref={svgRef}
      className="botanical-leaves"
      viewBox="0 0 1200 520"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g className="botanical-branch botanical-branch-left">
        <g data-botanical-drift>
          <g className="botanical-sway" data-botanical-sway data-botanical-origin="30 545">
            <path className="botanical-stem" d="M30 545C44 423 95 312 184 207C235 147 287 96 347 43" />
            <g className="botanical-secondary" data-botanical-secondary data-botanical-origin="76 367">
              <path className="botanical-stem botanical-twig" d="M76 367C54 338 40 307 36 274" />
              <Leaf transform="translate(38 277) rotate(-53) scale(.82)" />
              <Leaf transform="translate(73 364) rotate(-67) scale(.94)" />
            </g>
            <g className="botanical-secondary" data-botanical-secondary data-botanical-origin="111 300">
              <path className="botanical-stem botanical-twig" d="M111 300C145 292 174 273 197 244" />
              <Leaf transform="translate(198 245) rotate(54) scale(.82)" />
            </g>
            <g className="botanical-secondary" data-botanical-secondary data-botanical-origin="153 239">
              <path className="botanical-stem botanical-twig" d="M153 239C134 208 127 180 130 154" />
              <Leaf transform="translate(130 157) rotate(-45) scale(.72)" />
              <Leaf transform="translate(154 239) rotate(-62) scale(.86)" />
            </g>
            <g className="botanical-secondary" data-botanical-secondary data-botanical-origin="202 185">
              <path className="botanical-stem botanical-twig" d="M202 185C239 178 269 160 292 132" />
              <Leaf transform="translate(292 133) rotate(49) scale(.74)" />
            </g>
            <g className="botanical-secondary" data-botanical-secondary data-botanical-origin="255 125">
              <path className="botanical-stem botanical-twig" d="M255 125C244 99 242 77 247 57" />
              <Leaf transform="translate(248 59) rotate(-34) scale(.64)" />
            </g>
            <Leaf transform="translate(347 44) rotate(37) scale(.68)" />
          </g>
        </g>
      </g>

      <g className="botanical-branch botanical-branch-right">
        <g data-botanical-drift>
          <g className="botanical-sway" data-botanical-sway data-botanical-origin="1175 545">
            <path className="botanical-stem" d="M1175 545C1159 430 1117 327 1033 222C982 158 929 106 862 50" />
            <g className="botanical-secondary" data-botanical-secondary data-botanical-origin="1135 387">
              <path className="botanical-stem botanical-twig" d="M1135 387C1155 357 1168 326 1172 291" />
              <Leaf transform="translate(1171 293) rotate(52) scale(.8)" />
              <Leaf transform="translate(1136 387) rotate(66) scale(.91)" />
            </g>
            <g className="botanical-secondary" data-botanical-secondary data-botanical-origin="1100 316">
              <path className="botanical-stem botanical-twig" d="M1100 316C1065 305 1038 286 1017 258" />
              <Leaf transform="translate(1017 259) rotate(-55) scale(.8)" />
            </g>
            <g className="botanical-secondary" data-botanical-secondary data-botanical-origin="1054 256">
              <path className="botanical-stem botanical-twig" d="M1054 256C1076 225 1084 197 1082 170" />
              <Leaf transform="translate(1082 172) rotate(44) scale(.7)" />
              <Leaf transform="translate(1054 256) rotate(61) scale(.84)" />
            </g>
            <g className="botanical-secondary" data-botanical-secondary data-botanical-origin="1004 188">
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
