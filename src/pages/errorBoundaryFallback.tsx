export const errorBoundaryFallbackWithRefetch =
  (refetch: () => void) => (err: Error, reset: () => void) =>
    (
      <div>
        <p>Failed to load!</p>
        <p>Reason: {err.message}</p>
        <button
          class='btn btn-outline-success'
          onClick={() => {
            refetch()
            reset()
          }}
        >
          Try again
        </button>
      </div>
    )
