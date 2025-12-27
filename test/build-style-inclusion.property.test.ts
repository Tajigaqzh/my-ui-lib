import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { resolve, join } from "path";

/**
 * Feature: playground-enhancement, Property 3: Build Style Inclusion
 * Validates: Requirements 2.1, 2.3
 */

describe("Build Style Inclusion Property Tests", () => {
  it("Property 3: Build Style Inclusion - For any component with styles, the build process should include all component-specific SCSS styles in the output bundle", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("button", "card"), // Available components with styles
        fc.record({
          // Test different build output formats
          format: fc.constantFrom("es", "cjs"),
          checkType: fc.constantFrom("css-extraction", "js-bundle", "package-exports")
        }),
        (componentName, testConfig) => {
          const distPath = resolve(__dirname, '../dist');
          expect(existsSync(distPath)).toBe(true);
          
          if (testConfig.checkType === "css-extraction") {
            // Verify CSS file exists and contains component styles
            const cssPath = join(distPath, 'style.css');
            expect(existsSync(cssPath)).toBe(true);
            
            const cssContent = readFileSync(cssPath, 'utf-8');
            
            // Should contain component-specific styles
            const componentClass = `my-${componentName}`;
            expect(cssContent).toMatch(new RegExp(`\\.${componentClass}\\[data-v-[a-f0-9]+\\]`));
            
            // Should be minified (production ready)
            expect(cssContent).not.toMatch(/\n\s+/); // No indented newlines
            expect(cssContent.length).toBeGreaterThan(0);
            
          } else if (testConfig.checkType === "js-bundle") {
            // Verify component JS bundles exist
            const componentJsPath = join(distPath, `core/${componentName}.${testConfig.format}.js`);
            expect(existsSync(componentJsPath)).toBe(true);
            
            const jsContent = readFileSync(componentJsPath, 'utf-8');
            
            // Should contain Vue component code
            expect(jsContent.length).toBeGreaterThan(0);
            
            // Should have proper module format
            if (testConfig.format === "es") {
              expect(jsContent).toMatch(/export|import/);
            } else if (testConfig.format === "cjs") {
              expect(jsContent).toMatch(/module\.exports|require/);
            }
            
          } else if (testConfig.checkType === "package-exports") {
            // Verify package.json exports are properly configured
            const packageJsonPath = resolve(__dirname, '../packages/core/package.json');
            expect(existsSync(packageJsonPath)).toBe(true);
            
            const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
            
            // Should have style exports
            expect(packageJson.exports).toBeDefined();
            expect(packageJson.exports['./style.css']).toBeDefined();
            expect(packageJson.exports['./style']).toBeDefined();
            
            // Should have component exports
            expect(packageJson.exports[`./${componentName}`]).toBeDefined();
            
            // Style CSS export should point to correct file
            expect(packageJson.exports['./style.css']).toBe('../../dist/style.css');
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("Property 3 Extension: Build completeness - For any build output, all expected files should be generated with correct structure", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("dist"), // Build output directory
        fc.record({
          fileType: fc.constantFrom("css", "js", "map", "dts"),
          format: fc.constantFrom("es", "cjs")
        }),
        (buildDir, testConfig) => {
          const distPath = resolve(__dirname, `../${buildDir}`);
          expect(existsSync(distPath)).toBe(true);
          
          if (testConfig.fileType === "css") {
            // CSS file should exist and be properly formatted
            const cssPath = join(distPath, 'style.css');
            expect(existsSync(cssPath)).toBe(true);
            
            const cssContent = readFileSync(cssPath, 'utf-8');
            
            // Should contain all component styles
            expect(cssContent).toContain('.my-button[data-v-');
            expect(cssContent).toContain('.my-card[data-v-');
            
            // Should be minified
            expect(cssContent).not.toMatch(/\n\s+/);
            
          } else if (testConfig.fileType === "js") {
            // JavaScript bundles should exist for each format
            const expectedFiles = [
              `index.${testConfig.format}.js`,
              `style.${testConfig.format}.js`,
              `core/button.${testConfig.format}.js`,
              `core/card.${testConfig.format}.js`
            ];
            
            expectedFiles.forEach(fileName => {
              const filePath = join(distPath, fileName);
              expect(existsSync(filePath)).toBe(true);
              
              const content = readFileSync(filePath, 'utf-8');
              expect(content.length).toBeGreaterThan(0);
            });
            
          } else if (testConfig.fileType === "map") {
            // Source maps should exist for debugging
            const mapFiles = [
              `index.${testConfig.format}.js.map`,
              `style.${testConfig.format}.js.map`,
              `core/button.${testConfig.format}.js.map`,
              `core/card.${testConfig.format}.js.map`
            ];
            
            mapFiles.forEach(fileName => {
              const filePath = join(distPath, fileName);
              expect(existsSync(filePath)).toBe(true);
              
              const content = readFileSync(filePath, 'utf-8');
              const sourceMap = JSON.parse(content);
              
              expect(sourceMap.version).toBe(3);
              expect(sourceMap.sources).toBeDefined();
              expect(Array.isArray(sourceMap.sources)).toBe(true);
            });
            
          } else if (testConfig.fileType === "dts") {
            // TypeScript declaration files should exist
            const dtsFiles = readdirSync(distPath, { recursive: true })
              .filter(file => typeof file === 'string' && file.endsWith('.d.ts'));
            
            expect(dtsFiles.length).toBeGreaterThan(0);
            
            // Should have main index.d.ts
            expect(dtsFiles.some(file => file.includes('index.d.ts'))).toBe(true);
          }
        }
      ),
      { numRuns: 50 }
    );
  });

  it("Property 3 Extension: Style bundle integrity - For any style bundle, all component styles should be properly scoped and complete", () => {
    fc.assert(
      fc.property(
        fc.array(fc.constantFrom("button", "card"), { minLength: 1, maxLength: 2 }),
        (componentNames) => {
          const cssPath = resolve(__dirname, '../dist/style.css');
          const cssContent = readFileSync(cssPath, 'utf-8');
          
          // Each component should have its styles included
          componentNames.forEach(componentName => {
            const componentClass = `my-${componentName}`;
            
            // Base component class should exist
            expect(cssContent).toMatch(new RegExp(`\\.${componentClass}\\[data-v-[a-f0-9]+\\]`));
            
            // Component-specific modifiers should exist
            if (componentName === "button") {
              expect(cssContent).toMatch(/\.my-button--default\[data-v-[a-f0-9]+\]/);
              expect(cssContent).toMatch(/\.my-button--primary\[data-v-[a-f0-9]+\]/);
              expect(cssContent).toMatch(/\.my-button--small\[data-v-[a-f0-9]+\]/);
              expect(cssContent).toMatch(/\.my-button--medium\[data-v-[a-f0-9]+\]/);
              expect(cssContent).toMatch(/\.my-button--large\[data-v-[a-f0-9]+\]/);
            } else if (componentName === "card") {
              expect(cssContent).toMatch(/\.my-card--always\[data-v-[a-f0-9]+\]/);
              expect(cssContent).toMatch(/\.my-card--hover\[data-v-[a-f0-9]+\]/);
              expect(cssContent).toMatch(/\.my-card__header\[data-v-[a-f0-9]+\]/);
              expect(cssContent).toMatch(/\.my-card__title\[data-v-[a-f0-9]+\]/);
              expect(cssContent).toMatch(/\.my-card__body\[data-v-[a-f0-9]+\]/);
            }
          });
          
          // CSS should be properly formatted for production
          expect(cssContent).not.toMatch(/\/\*[\s\S]*?\*\//); // No comments
          expect(cssContent).not.toMatch(/\n\s+/); // No indented newlines
          
          // Should contain essential CSS properties
          expect(cssContent).toContain('display:');
          expect(cssContent).toContain('padding:');
          expect(cssContent).toContain('border:');
          expect(cssContent).toContain('background-color:');
          
          // File size should be reasonable (not empty, not too large)
          expect(cssContent.length).toBeGreaterThan(100);
          expect(cssContent.length).toBeLessThan(10000); // Reasonable upper bound
        }
      ),
      { numRuns: 30 }
    );
  });

  it("Property 3 Extension: Build consistency - For any build configuration, output should be deterministic and complete", () => {
    fc.assert(
      fc.property(
        fc.record({
          checkAspect: fc.constantFrom("file-structure", "content-integrity")
        }),
        (testConfig) => {
          const distPath = resolve(__dirname, '../dist');
          
          if (testConfig.checkAspect === "file-structure") {
            // Verify expected directory structure
            const expectedDirs = ['core', 'icons', 'theme', 'utils'];
            expectedDirs.forEach(dir => {
              const dirPath = join(distPath, dir);
              if (existsSync(dirPath)) {
                expect(statSync(dirPath).isDirectory()).toBe(true);
              }
            });
            
            // Verify core component files
            const coreDir = join(distPath, 'core');
            if (existsSync(coreDir)) {
              const componentDirs = readdirSync(coreDir).filter(item => {
                const itemPath = join(coreDir, item);
                return statSync(itemPath).isDirectory();
              });
              
              // Should have component directories
              expect(componentDirs.length).toBeGreaterThan(0);
            }
            
          } else if (testConfig.checkAspect === "content-integrity") {
            // Verify file contents are not corrupted
            const cssPath = join(distPath, 'style.css');
            if (existsSync(cssPath)) {
              const cssContent = readFileSync(cssPath, 'utf-8');
              
              // Should be valid CSS (basic syntax check)
              expect(cssContent).toMatch(/\{[^}]*\}/); // Has CSS rules
              expect(cssContent).not.toMatch(/\{\s*\}/); // No empty rules
            }
          }
        }
      ),
      { numRuns: 20 }
    );
  });
});