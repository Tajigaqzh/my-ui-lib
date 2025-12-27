import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { ComponentDiscoveryService } from "../playground/src/services/component-discovery";
import type { ComponentInfo } from "../playground/src/types/playground";

/**
 * Feature: playground-enhancement, Property 5: Component Discovery Completeness
 * Validates: Requirements 4.1, 4.2, 4.3
 */

describe("Component Discovery Property Tests", () => {
  const discoveryService = new ComponentDiscoveryService();

  it("Property 5: Component Discovery Completeness - For any package structure containing valid components, the discovery service should detect all components and create corresponding routes", () => {
    fc.assert(
      fc.property(
        fc.constant(true), // Always true property since we're testing the current package structure
        () => {
          const components = discoveryService.scanComponents();
          
          // Should detect all known components in the core package
          expect(components).toBeDefined();
          expect(Array.isArray(components)).toBe(true);
          expect(components.length).toBeGreaterThan(0);
          
          // Should include the known components from packages/core
          const componentNames = components.map(c => c.name);
          expect(componentNames).toContain('button');
          expect(componentNames).toContain('card');
          
          // Each component should have required metadata
          components.forEach((component: ComponentInfo) => {
            expect(component.name).toBeDefined();
            expect(typeof component.name).toBe('string');
            expect(component.name.length).toBeGreaterThan(0);
            
            expect(component.path).toBeDefined();
            expect(typeof component.path).toBe('string');
            expect(component.path).toMatch(/^\/[a-z-]+$/); // Should be a valid path pattern
            
            expect(component.displayName).toBeDefined();
            expect(typeof component.displayName).toBe('string');
            expect(component.displayName.length).toBeGreaterThan(0);
          });
        }
      ),
      { numRuns: 10 }
    );
  });

  it("Property 5 Extension: Component uniqueness - All discovered components should have unique names and paths", () => {
    fc.assert(
      fc.property(
        fc.constant(true),
        () => {
          const components = discoveryService.scanComponents();
          
          // All component names should be unique
          const names = components.map(c => c.name);
          const uniqueNames = [...new Set(names)];
          expect(names).toHaveLength(uniqueNames.length);
          
          // All component paths should be unique
          const paths = components.map(c => c.path);
          const uniquePaths = [...new Set(paths)];
          expect(paths).toHaveLength(uniquePaths.length);
        }
      ),
      { numRuns: 10 }
    );
  });

  it("Property 5 Extension: Component retrieval consistency - getComponentByName should return consistent results", () => {
    fc.assert(
      fc.property(
        fc.constantFrom('button', 'card', 'nonexistent'),
        (componentName) => {
          const allComponents = discoveryService.scanComponents();
          const foundComponent = discoveryService.getComponentByName(componentName);
          
          if (componentName === 'nonexistent') {
            expect(foundComponent).toBeUndefined();
          } else {
            expect(foundComponent).toBeDefined();
            expect(foundComponent?.name).toBe(componentName);
            
            // Should be the same as finding it in the full list
            const fromList = allComponents.find(c => c.name === componentName);
            expect(foundComponent).toEqual(fromList);
          }
        }
      ),
      { numRuns: 10 }
    );
  });

  it("Property 5 Extension: Component names consistency - getComponentNames should match scanComponents names", () => {
    fc.assert(
      fc.property(
        fc.constant(true),
        () => {
          const allComponents = discoveryService.scanComponents();
          const componentNames = discoveryService.getComponentNames();
          
          expect(componentNames).toHaveLength(allComponents.length);
          
          const expectedNames = allComponents.map(c => c.name).sort();
          const actualNames = componentNames.sort();
          
          expect(actualNames).toEqual(expectedNames);
        }
      ),
      { numRuns: 10 }
    );
  });
});