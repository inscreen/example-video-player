# inScreen example with video

[Read more at inScreen docs](https://docs.inscreen.com/)

To run the example:

1. Create a sandbox account.
2. Create an `.env` file in this folder as follows using the values of your sandbox account.
    ```
    REACT_APP_INSCREEN_TENANT_ID=...
    REACT_APP_INSCREEN_API_KEY=...
    ```
3. Run `npm start`

### Simplified Diagram

```mermaid
graph TB
    subgraph Application
    M[Main]
    VP[Video Player]
    end

    subgraph inScreen
    ISSDK[inScreen SDK & timeline component]
    end

    M ==>|1. initialize with token| ISSDK
    M -.->|render| VP
    VP ==>|2. update current time| ISSDK
    VP ==>|3. start new thread| ISSDK
    ISSDK ==>|4. seek & pause when activated| VP
    ISSDK ==>|5. analytics events| M
```

### Extended Diagram

```mermaid
graph TB
    subgraph Application
    M[Main]
    VP[Video Player]
    end

    subgraph inScreen
    ISSDK[inScreen SDK]
    ISA["&lt;inscreen-anchor /&gt; element"]
    ISTL["inScreen timeline component"]
    end

    M ==>|1. initialize with token| ISSDK
    M -.->|render| VP
    VP -.->|render| ISA
    VP -.->|optionally render, based on toggle| ISTL
    VP ==>|2. update current time| ISA
    VP ==>|3. start new thread| ISSDK
    ISSDK ==>|4. seek & pause when activated| VP
    ISTL <-.->|synchronization| ISSDK
    ISA -.->|synchronization| ISSDK
    ISSDK ==>|5. analytics events| M
```