In draft spec here, request following changes:

- Move `return_eligible` to `Item.return_terms`
- Move `replacement_eligible` to `Item.replacement_terms`
- Add `fulfillment_managed_by` to `Item.replacement_terms`

**Reason:**
Return & replacement of items is independent of cancellation. Cancellation of a fulfillment can result in return-to-origin (RTO) if the buyer refuses to accept it, irrespective of what `return_eligible` is. On the other hand, fashion items are generally returnable while some items (that are made-to-order e.g., cake) can't be returned, hence `return_eligible` will be false.

**Goals:**
To identify the problem being addressed here and provide a solution.

**Expected Outcome:**
Recommendation for changes in the protocol specification.