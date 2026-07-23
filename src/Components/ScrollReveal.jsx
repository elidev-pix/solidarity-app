import React from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

/**
 * Enveloppe n'importe quel contenu pour un effet fade-in-up au scroll.
 *
 * Props :
 * - delay      : délai en ms avant l'apparition (pour effet cascade) — défaut 0
 * - duration   : durée de l'animation en ms — défaut 600
 * - distance   : distance de translation en px — défaut 24
 * - threshold  : % de l'élément visible avant déclenchement — défaut 0.15
 * - once       : si false, l'animation se rejoue à chaque entrée/sortie — défaut true
 * - as         : balise HTML à utiliser (div, section...) — défaut 'div'
 * - className  : classes Tailwind supplémentaires
 */
function ScrollReveal({
  children,
  delay = 0,
  duration = 600,
  distance = 24,
  threshold = 0.15,
  once = true,
  as: Tag = 'div',
  className = '',
}) {
  const [ref, isVisible] = useScrollReveal({ threshold, once })

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : `translateY(${distance}px)`,
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Tag>
  )
}

export default ScrollReveal