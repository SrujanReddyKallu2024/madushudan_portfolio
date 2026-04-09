"use client";

import React, { Children, isValidElement } from "react";
import clsx from "clsx";

interface StickyTabItemProps {
  title: string;
  id: string | number;
  children: React.ReactNode;
}

const StickyTabItem: React.FC<StickyTabItemProps> = () => null;

interface StickyTabsProps {
  children: React.ReactNode;
  mainNavHeight?: string;
  rootClassName?: string;
  navSpacerClassName?: string;
  sectionClassName?: string;
  stickyHeaderContainerClassName?: string;
  headerContentWrapperClassName?: string;
  headerContentLayoutClassName?: string;
  titleClassName?: string;
  contentLayoutClassName?: string;
}

const StickyTabs: React.FC<StickyTabsProps> & { Item: React.FC<StickyTabItemProps> } = ({
  children,
  mainNavHeight = "6em",
  rootClassName = "bg-transparent text-foreground",
  navSpacerClassName = "border-b border-border/40 bg-background",
  sectionClassName = "bg-background/50",
  stickyHeaderContainerClassName = "shadow-lg",
  headerContentWrapperClassName = "border-b border-t border-border/60 bg-background/90 backdrop-blur-xl",
  headerContentLayoutClassName = "mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8",
  titleClassName = "my-0 font-display text-2xl font-medium leading-none md:text-3xl lg:text-4xl text-foreground",
  contentLayoutClassName = "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8",
}) => {
  const stickyTopValue = `calc(${mainNavHeight} - 1px)`;
  const navHeightStyle = { height: mainNavHeight };
  const stickyHeaderStyle = { top: stickyTopValue };

  return (
    <div className={clsx("overflow-clip", rootClassName)}>
      <div
        className={clsx("sticky left-0 top-0 z-20 w-full", navSpacerClassName)}
        style={navHeightStyle}
        aria-hidden="true"
      />

      {Children.map(children, (child) => {
        if (!isValidElement(child) || child.type !== StickyTabItem) {
          if (import.meta.env.DEV && child != null) {
            console.warn("StickyTabs expects <StickyTabs.Item> components as direct children.");
          }
          return null;
        }

        const itemElement = child as React.ReactElement<StickyTabItemProps>;
        const { title, id, children: itemContent } = itemElement.props;

        return (
          <section
            key={id}
            id={typeof id === "string" ? id : undefined}
            className={clsx("relative overflow-clip", sectionClassName)}
          >
            <div
              className={clsx(
                "sticky z-10 -mt-px flex flex-col",
                stickyHeaderContainerClassName
              )}
              style={stickyHeaderStyle}
            >
              <div className={clsx(headerContentWrapperClassName)}>
                <div className={clsx(headerContentLayoutClassName)}>
                  <div className="flex items-center justify-between">
                    <h2 className={clsx(titleClassName)}>{title}</h2>
                  </div>
                </div>
              </div>
            </div>

            <div className={clsx(contentLayoutClassName)}>{itemContent}</div>
          </section>
        );
      })}
    </div>
  );
};

StickyTabs.Item = StickyTabItem;

export default StickyTabs;
