import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface InScreenSdkOptions {
    endpoint: string;
    tenantId: string;
    token: string;
    /** Default: true */
    restoreEventFromUrl?: boolean;
    /** Default: inscreen. null means "do not register custom elements". */
    customElementsPrefix?: string | null;
}

type BehaviorType =
    | 'none'
    | 'drawer'
    | 'inline-button'
    | 'floating-controls'
    | 'inline-thread-list'
    | 'inline-timeline-threads-display';

interface ClientEvent {
    name:
        | 'threadStartOpened'
        | 'threadCreated'
        | 'replyAdded'
        | 'reactionAdded'
        | 'reactionRemoved'
        | 'threadResolved'
        | 'threadReopened'
        | 'userMentioned'
        | 'anonymousUserMentioned'
        | 'timelineIndicatorActivated'
        | 'notificationDeepLinkUsed';
}

declare global {
    interface Window {
        inScreen: {
            initialize: (options: InScreenSdkOptions) => void;
            listenToTimelineActivations: (
                listener: (payload: { locator: string; value: number }) => boolean,
            ) => () => void;
            startThread: (locator: string, behavior: BehaviorType) => void;
            addClientEventsListener: (listener: (ev: CustomEvent<ClientEvent>) => void) => void;
            // Add additional methods from https://docs.inscreen.com/apis/client-side as needed
        };
    }
}

type InScreenHTMLProps<T> = Omit<
    DetailedHTMLProps<T & HTMLAttributes<HTMLElement> & { class?: string }, HTMLElement>,
    'children' | 'className'
>;

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'inscreen-page-anchor': InScreenHTMLProps<{
                locator: string;
                /** default: 'none' */
                behavior?:
                    | 'none'
                    | 'drawer'
                    | 'inline-button'
                    | 'floating-controls'
                    | 'inline-thread-list'
                    | 'inline-timeline-threads-display';
                /** default: 'bubbles' */
                ['behavior-style']?: 'bubbles' | 'stickies';
                version?: 'A';
                variant?: 'default';
                /** default: '1' */
                priority?: string;
                ['deep-link-url']?: string;
                title?: string;
                ['context-title']?: string;
                ['max-threads']?: string;
                ['associated-data']?: string;
                ['screenshot-url']?: string;
            }>;
            'inscreen-anchor': InScreenHTMLProps<{
                locator: string;
                /** default: 'none' */
                behavior?:
                    | 'none'
                    | 'drawer'
                    | 'inline-button'
                    | 'floating-controls'
                    | 'inline-thread-list'
                    | 'inline-timeline-threads-display';
                /** default: 'bubbles' */
                ['behavior-style']?: 'bubbles' | 'stickies';
                version?: 'A';
                variant?: 'default';
                /** default: '1' */
                priority?: string;
                ['deep-link-url']?: string;
                state?: string;
                ['scroll-selector']?: string;
                title?: string;
                ['context-title']?: string;
                /** default: '' - true */
                screenshot?: string;
                ['max-threads']?: string;
                ['associated-data']?: string;
                ['screenshot-url']?: string;
            }>;
            'inscreen-drawer': InScreenHTMLProps<{}>;
            'inscreen-inbox': InScreenHTMLProps<{}>;
            'inscreen-inline-anchor-indicator': InScreenHTMLProps<{
                hidden: 'true';
                locator: string;
                /** default: 'open-drawer */
                action?: 'open-drawer' | 'single-floating-control' | 'thread-list-floating-control' | 'none';
                /** default: '' - false */
                recursive?: string;
                /** default: 'minimal' */
                ['indicator-style']?: 'minimal' | 'bubble';
                ['start-thread-locator']?: string;
                title?: string;
            }> & { children?: any };
            'inscreen-inline-inbox-indicator': InScreenHTMLProps<{ hidden: 'true' }> & { children?: any };
            'inscreen-inline-thread-list': InScreenHTMLProps<{
                filter: 'all' | 'relevantToMe' | 'active' | 'unread' | 'resolved';
                locator?: string;
                locators?: string;
                ['new-thread-locator']?: string;
                ['header-text']?: string;
            }> & { children?: any };
            'inscreen-inline-timeline-threads-display': InScreenHTMLProps<{
                locator: string;
                ['start-value']: string;
                ['end-value']: string;
                /** default: 'top' */
                ['indicator-position']?: 'top' | 'bottom';
            }> & { children?: any };
        }
    }
}

declare module 'csstype' {
    interface Properties {
        '--inscreen-base-z-index'?: string;
        '--inscreen-color-primary'?: string;
        '--inscreen-color-secondary-1'?: string;
        '--inscreen-color-secondary-2'?: string;
        '--inscreen-color-secondary-3'?: string;
        '--inscreen-color-secondary-4'?: string;
        '--inscreen-color-background'?: string;
    }
}
