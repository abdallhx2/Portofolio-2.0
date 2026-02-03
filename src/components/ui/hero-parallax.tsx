"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export interface ProductItem {
  title: string;
  link: string;
  thumbnail: string;
  category?: string;
  client?: string;
  year?: number;
  tags?: string[];
}

export const HeroParallax = ({
  products,
  header,
}: {
  products: ProductItem[];
  header?: React.ReactNode;
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  return (
    <div className="py-8 md:py-16 lg:py-24 overflow-hidden antialiased relative flex flex-col">
      {header}
      <div className="px-4 md:px-8 mt-8 md:mt-12">
        <div className="flex flex-row-reverse gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-6 sm:mb-8 md:mb-10 lg:mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              key={product.title}
            />
          ))}
        </div>
        <div className="flex flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-6 sm:mb-8 md:mb-10 lg:mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              key={product.title}
            />
          ))}
        </div>
        <div className="flex flex-row-reverse gap-4 sm:gap-6 md:gap-8 lg:gap-10 overflow-x-auto pb-4 scrollbar-hide">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              key={product.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const ProductCard = ({
  product,
}: {
  product: ProductItem;
}) => {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      transition={{ duration: 0.2 }}
      key={product.title}
      className="group/product h-56 w-72 sm:h-64 sm:w-80 md:h-80 md:w-[22rem] lg:h-[26rem] lg:w-[32rem] relative shrink-0 rounded-xl overflow-hidden border transition-all duration-300 hover:border-primary hover:shadow-xl"
      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
    >
      {/* Image Section */}
      <div className="relative h-[60%] border-b" style={{ borderColor: 'var(--border)' }}>
        <Link href={product.link} className="block h-full w-full">
          <Image
            src={product.thumbnail}
            height={600}
            width={600}
            className="object-cover object-center h-full w-full"
            alt={product.title}
          />
        </Link>
        {product.category && (
          <div
            className="absolute top-2 right-2 md:top-3 md:right-3 text-white text-[10px] md:text-xs px-2 py-1 rounded-full font-medium"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            {product.category}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3 md:p-4 lg:p-5 h-[40%] flex flex-col justify-between">
        <div>
          <Link href={product.link}>
            <h3
              className="font-semibold text-sm md:text-base lg:text-lg mb-1 group-hover/product:text-primary transition-colors line-clamp-1"
              style={{ color: 'var(--foreground)' }}
            >
              {product.title}
            </h3>
          </Link>
          {(product.client || product.year) && (
            <p className="text-[10px] md:text-xs lg:text-sm" style={{ color: 'var(--muted-foreground)' }}>
              {product.client}{product.client && product.year && ' • '}{product.year}
            </p>
          )}
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-[9px] md:text-[10px] lg:text-xs px-1.5 md:px-2 py-0.5 rounded"
                style={{ backgroundColor: 'var(--background)', color: 'var(--muted-foreground)' }}
              >
                {tag}
              </span>
            ))}
            {product.tags.length > 3 && (
              <span className="text-[9px] md:text-[10px] lg:text-xs" style={{ color: 'var(--muted-foreground)' }}>
                +{product.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
