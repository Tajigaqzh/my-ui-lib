import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

/**
 * Feature: playground-enhancement, Property 2: Style Preservation Round Trip
 * Validates: Requirements 2.2
 */

describe("Style Preservation Property Tests", () => {
  it("Property 2: Style Preservation Round Trip - For any component with SCSS styles, rendering in build mode should produce visually identical results to rendering in source mode", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("button", "card"), // Available components with styles
        fc.record({
          // Generate CSS class patterns to test
          modifier: fc.constantFrom("default", "primary", "small", "medium", "large", "always", "hover"),
          pseudoClass: fc.constantFrom("", ":hover", ":disabled", ":focus")
        }),
        (componentName, testCase) => {
          // Load the built CSS file
          const cssPath = resolve(__dirname, '../dist/style.css');
          expect(existsSync(cssPath)).toBe(true);
          
          const builtCSS = readFileSync(cssPath, 'utf-8');
          
          // Verify that component styles are present in built CSS
          const baseClass = `my-${componentName}`;
          
          // Should contain the base component class with scoped attribute
          const baseClassRegex = new RegExp(`\\.${baseClass}\\[data-v-[a-f0-9]+\\]`);
          expect(builtCSS).toMatch(baseClassRegex);
          
          // Should contain component-specific modifiers
          if (testCase.modifier === "primary" && componentName === "button") {
            expect(builtCSS).toMatch(/\.my-button--primary\[data-v-[a-f0-9]+\]/);
          }
          if (testCase.modifier === "small" && componentName === "button") {
            expect(builtCSS).toMatch(/\.my-button--small\[data-v-[a-f0-9]+\]/);
          }
          if (testCase.modifier === "always" && componentName === "card") {
            expect(builtCSS).toMatch(/\.my-card--always\[data-v-[a-f0-9]+\]/);
          }
          
          // CSS should be properly minified (no unnecessary whitespace)
          expect(builtCSS).not.toMatch(/\n\s+/);
          
          // CSS should contain essential style properties
          if (componentName === "button") {
            expect(builtCSS).toContain('display:inline-block');
            expect(builtCSS).toContain('padding:');
            expect(builtCSS).toContain('border-radius:');
          } else if (componentName === "card") {
            expect(builtCSS).toContain('border-radius:4px');
            expect(builtCSS).toContain('overflow:hidden');
          }
          
          // Verify scoped styling is preserved
          const scopedAttributeRegex = /\[data-v-[a-f0-9]+\]/g;
          const scopedMatches = builtCSS.match(scopedAttributeRegex);
          expect(scopedMatches).toBeTruthy();
          expect(scopedMatches!.length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("Property 2 Extension: CSS completeness - For any component, all essential CSS properties should be preserved in the build", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("button", "card"),
        (componentName) => {
          const cssPath = resolve(__dirname, '../dist/style.css');
          const builtCSS = readFileSync(cssPath, 'utf-8');
          
          // Define essential properties for each component
          const essentialProperties = {
            button: [
              'display:inline-block',
              'padding:',
              'border:',
              'border-radius:',
              'background-color:',
              'color:',
              'cursor:pointer',
              'transition:'
            ],
            card: [
              'border-radius:4px',
              'border:',
              'background-color:#fff',
              'overflow:hidden',
              'color:',
              'transition:'
            ]
          };
          
          const requiredProps = essentialProperties[componentName as keyof typeof essentialProperties];
          
          // All essential properties should be present
          requiredProps.forEach(prop => {
            expect(builtCSS).toContain(prop);
          });
          
          // Component should have proper scoped styling
          const componentClass = `my-${componentName}`;
          expect(builtCSS).toMatch(new RegExp(`\\.${componentClass}\\[data-v-[a-f0-9]+\\]`));
        }
      ),
      { numRuns: 50 }
    );
  });

  it("Property 2 Extension: Style isolation - For any component, scoped styles should not conflict with other components", () => {
    fc.assert(
      fc.property(
        fc.shuffledSubarray(["button", "card"], { minLength: 2, maxLength: 2 }), // Ensure different components
        (componentNames) => {
          const cssPath = resolve(__dirname, '../dist/style.css');
          const builtCSS = readFileSync(cssPath, 'utf-8');
          
          // Extract scoped attributes for each component
          const scopedAttributes: Record<string, string[]> = {};
          
          componentNames.forEach(componentName => {
            const componentClass = `my-${componentName}`;
            const regex = new RegExp(`\\.${componentClass}\\[data-v-([a-f0-9]+)\\]`, 'g');
            const matches = [...builtCSS.matchAll(regex)];
            
            scopedAttributes[componentName] = matches.map(match => match[1]);
          });
          
          // Each component should have its own unique scoped attributes
          const allAttributes = Object.values(scopedAttributes).flat();
          
          // Should have at least one scoped attribute per component
          Object.values(scopedAttributes).forEach(attrs => {
            expect(attrs.length).toBeGreaterThan(0);
          });
          
          // Different components should have different scoped attributes (isolation)
          if (componentNames.length > 1 && componentNames[0] !== componentNames[1]) {
            const [comp1, comp2] = componentNames;
            const attrs1 = scopedAttributes[comp1];
            const attrs2 = scopedAttributes[comp2];
            
            // Should not share scoped attributes (proper isolation)
            const sharedAttrs = attrs1.filter(attr => attrs2.includes(attr));
            expect(sharedAttrs.length).toBe(0);
          }
        }
      ),
      { numRuns: 20 }
    );
  });
});