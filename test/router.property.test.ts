import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import router from "../playground/src/router/index";
import { componentDiscoveryService } from "../playground/src/services/component-discovery";

/**
 * Feature: playground-enhancement, Property 1: Component Route Generation
 * Validates: Requirements 1.1, 1.2, 1.4
 * 
 * Feature: playground-enhancement, Property 6: Navigation Menu Synchronization
 * Validates: Requirements 1.5, 4.3
 */

describe("Router Property Tests", () => {
  it("Property 1: Component Route Generation - For any valid component in the core package, the router should generate exactly one route with the correct path pattern /componentName", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("button", "card"), // Valid components from core package
        (componentName) => {
          // Find the route for this component
          const route = router.getRoutes().find(r => r.path === `/${componentName}`);
          
          // Should have exactly one route with correct path pattern
          expect(route).toBeDefined();
          expect(route?.path).toBe(`/${componentName}`);
          expect(route?.name).toBe(componentName.charAt(0).toUpperCase() + componentName.slice(1));
          
          // Should have proper meta information
          expect(route?.meta).toBeDefined();
          expect(route?.meta?.title).toBeDefined();
          expect(typeof route?.meta?.title).toBe('string');
          
          // Component should be defined (direct import, not lazy loaded)
          expect(route?.components?.default).toBeDefined();
          expect(typeof route?.components?.default).toBe('object');
        }
      ),
      { numRuns: 10 } // Reduced for faster execution
    );
  });

  it("Property 1 Extension: Route uniqueness - For any set of valid components, each should have exactly one unique route", () => {
    fc.assert(
      fc.property(
        fc.array(fc.constantFrom("button", "card"), { minLength: 1, maxLength: 2 }),
        (componentNames) => {
          const uniqueComponents = [...new Set(componentNames)];
          const routes = router.getRoutes();
          
          // Each component should have exactly one route
          uniqueComponents.forEach(componentName => {
            const matchingRoutes = routes.filter(r => r.path === `/${componentName}`);
            expect(matchingRoutes).toHaveLength(1);
          });
          
          // All component routes should be unique
          const componentRoutes = routes.filter(r => r.path !== '/');
          const paths = componentRoutes.map(r => r.path);
          const uniquePaths = [...new Set(paths)];
          expect(paths).toHaveLength(uniquePaths.length);
        }
      ),
      { numRuns: 10 } // Reduced for faster execution
    );
  });

  it("Property 1 Extension: Home route existence - The router should always have a home route at root path", () => {
    fc.assert(
      fc.property(
        fc.constant(true), // Always true property
        () => {
          const homeRoute = router.getRoutes().find(r => r.path === '/');
          
          expect(homeRoute).toBeDefined();
          expect(homeRoute?.name).toBe('Home');
          expect(homeRoute?.meta?.title).toBeDefined();
          expect(homeRoute?.components?.default).toBeDefined();
        }
      ),
      { numRuns: 10 } // Reduced for faster execution
    );
  });

  /**
   * Feature: playground-enhancement, Property 6: Navigation Menu Synchronization
   * Validates: Requirements 1.5, 4.3
   */
  it("Property 6: Navigation Menu Synchronization - For any set of discovered components, the navigation menu should contain exactly one link per component with correct routing", () => {
    fc.assert(
      fc.property(
        fc.constant(true), // Always test with current discovered components
        () => {
          // Get discovered components
          const discoveredComponents = componentDiscoveryService.scanComponents();
          
          // Get router routes (excluding home route)
          const routes = router.getRoutes();
          const componentRoutes = routes.filter(r => r.path !== '/');
          
          // Each discovered component should have exactly one corresponding route
          discoveredComponents.forEach(component => {
            const matchingRoutes = componentRoutes.filter(r => r.path === component.path);
            expect(matchingRoutes).toHaveLength(1);
            
            const route = matchingRoutes[0];
            // Route should have correct path pattern
            expect(route.path).toBe(`/${component.name}`);
            
            // Route should have proper navigation metadata
            expect(route.meta).toBeDefined();
            expect(route.meta?.title).toBeDefined();
            expect(typeof route.meta?.title).toBe('string');
            
            // Route name should match component display name
            expect(route.name).toBe(component.displayName);
          });
          
          // Each component route should correspond to a discovered component
          componentRoutes.forEach(route => {
            const componentName = route.path.substring(1); // Remove leading '/'
            const matchingComponents = discoveredComponents.filter(c => c.name === componentName);
            expect(matchingComponents).toHaveLength(1);
          });
          
          // Total count should match (one-to-one correspondence)
          expect(componentRoutes).toHaveLength(discoveredComponents.length);
        }
      ),
      { numRuns: 10 } // Reduced for faster execution
    );
  });

  it("Property 6 Extension: Navigation consistency across route changes - For any valid component route, navigation should remain consistent", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("button", "card"),
        (componentName) => {
          const routes = router.getRoutes();
          const componentRoute = routes.find(r => r.path === `/${componentName}`);
          const homeRoute = routes.find(r => r.path === '/');
          
          // Both routes should exist and be navigable
          expect(componentRoute).toBeDefined();
          expect(homeRoute).toBeDefined();
          
          // Component route should have proper structure for navigation
          expect(componentRoute?.path).toBe(`/${componentName}`);
          expect(componentRoute?.name).toBeDefined();
          expect(componentRoute?.components?.default).toBeDefined();
          
          // Home route should always be accessible
          expect(homeRoute?.path).toBe('/');
          expect(homeRoute?.name).toBe('Home');
          expect(homeRoute?.components?.default).toBeDefined();
          
          // Navigation metadata should be consistent
          expect(componentRoute?.meta?.title).toContain('Component');
          expect(homeRoute?.meta?.title).toBeDefined();
        }
      ),
      { numRuns: 10 } // Reduced for faster execution
    );
  });
});