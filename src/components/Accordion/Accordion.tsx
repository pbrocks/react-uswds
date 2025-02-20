import React, { useState } from 'react'
import classnames from 'classnames'

export interface AccordionItemProps {
  title: React.ReactNode | string
  content: React.ReactNode
  expanded: boolean
  id: string
  className?: string
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  handleToggle?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

interface AccordionProps {
  bordered?: boolean
  multiselectable?: boolean
  items: AccordionItemProps[]
  className?: string
}

export const AccordionItem = ({
  title,
  id,
  content,
  expanded,
  className,
  headingLevel = 'h4',
  handleToggle,
}: AccordionItemProps): React.ReactElement => {
  const headingClasses = classnames('usa-accordion__heading', className)
  const contentClasses = classnames(
    'usa-accordion__content',
    'usa-prose',
    className
  )
  const Heading = headingLevel

  return (
    <>
      <Heading className={headingClasses}>
        <button
          type="button"
          className="usa-accordion__button"
          aria-expanded={expanded}
          aria-controls={id}
          data-testid={`accordionButton_${id}`}
          onClick={handleToggle}
        >
          {title}
        </button>
      </Heading>
      <div
        id={id}
        data-testid={`accordionItem_${id}`}
        className={contentClasses}
        hidden={!expanded}
      >
        {content}
      </div>
    </>
  )
}

export const Accordion = ({
  bordered,
  items,
  className,
  multiselectable = false,
}: AccordionProps): React.ReactElement => {
  const [openItems, setOpenState] = useState(
    items.filter((i) => !!i.expanded).map((i) => i.id)
  )

  const classes = classnames(
    'usa-accordion',
    {
      'usa-accordion--bordered': bordered,
    },
    className
  )

  const toggleItem = (itemId: AccordionItemProps['id']): void => {
    const newOpenItems = [...openItems]
    const itemIndex = openItems.indexOf(itemId)
    const isMultiselectable = multiselectable

    if (itemIndex > -1) {
      newOpenItems.splice(itemIndex, 1)
    } else {
      if (isMultiselectable) {
        newOpenItems.push(itemId)
      } else {
        newOpenItems.splice(0, newOpenItems.length)
        newOpenItems.push(itemId)
      }
    }
    setOpenState(newOpenItems)
  }

  return (
    <div
      className={classes}
      data-testid="accordion"
      aria-multiselectable={multiselectable || undefined}
    >
      {items.map((item, i) => (
        <AccordionItem
          key={`accordionItem_${i}`}
          {...item}
          expanded={openItems.indexOf(item.id) > -1}
          handleToggle={(): void => {
            toggleItem(item.id)
          }}
        />
      ))}
    </div>
  )
}

export default Accordion
