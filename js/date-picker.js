/**
 * Custom tour date picker — syncs to hidden input (YYYY-MM-DD) for form submit.
 */
(function initTourDatePicker() {
  const picker = document.getElementById("tourDatePicker");
  if (!picker) return;

  const hiddenInput = document.getElementById("tourDate");
  const trigger = document.getElementById("tourDateTrigger");
  const popover = document.getElementById("tourDatePopover");
  const backdrop = document.getElementById("tourDateBackdrop");
  const monthLabel = document.getElementById("tourDateMonthLabel");
  const grid = document.getElementById("tourDateGrid");
  const placeholderEl = trigger.querySelector(".date-picker__text--placeholder");
  const valueEl = trigger.querySelector(".date-picker__text--value");

  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = startOfDay(new Date());
  const maxDate = new Date(today);
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  let viewYear = today.getFullYear();
  let viewMonth = today.getMonth();
  let selectedDate = null;
  let isOpen = false;

  function startOfDay(d) {
    const copy = new Date(d);
    copy.setHours(0, 0, 0, 0);
    return copy;
  }

  function formatDisplay(date) {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  function toValueString(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function parseValueString(str) {
    if (!str || !/^\d{4}-\d{2}-\d{2}$/.test(str)) return null;
    const [y, m, d] = str.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return Number.isNaN(date.getTime()) ? null : startOfDay(date);
  }

  function isDisabled(date) {
    return date < today || date > maxDate;
  }

  function setSelected(date) {
    selectedDate = date ? startOfDay(date) : null;
    if (selectedDate) {
      hiddenInput.value = toValueString(selectedDate);
      valueEl.textContent = formatDisplay(selectedDate);
      valueEl.hidden = false;
      placeholderEl.hidden = true;
      trigger.classList.add("date-picker__trigger--filled");
      trigger.classList.remove("error");
    } else {
      hiddenInput.value = "";
      valueEl.hidden = true;
      placeholderEl.hidden = false;
      trigger.classList.remove("date-picker__trigger--filled");
    }
    renderGrid();
  }

  function renderGrid() {
    monthLabel.textContent = `${MONTHS[viewMonth]} ${viewYear}`;
    grid.innerHTML = "";

    const firstOfMonth = new Date(viewYear, viewMonth, 1);
    const startOffset = firstOfMonth.getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();
    for (let i = startOffset - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      const date = new Date(viewYear, viewMonth - 1, day);
      grid.appendChild(createDayButton(date, true));
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewYear, viewMonth, day);
      grid.appendChild(createDayButton(date, false));
    }

    const totalCells = grid.children.length;
    const trailing = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let day = 1; day <= trailing; day++) {
      const date = new Date(viewYear, viewMonth + 1, day);
      grid.appendChild(createDayButton(date, true));
    }
  }

  function createDayButton(date, isOutside) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "date-picker__day";
    btn.textContent = String(date.getDate());

    if (isOutside) btn.classList.add("date-picker__day--outside");

    const disabled = isDisabled(date);
    if (disabled) btn.classList.add("date-picker__day--disabled");
    if (startOfDay(date).getTime() === today.getTime()) {
      btn.classList.add("date-picker__day--today");
    }
    if (
      selectedDate &&
      startOfDay(date).getTime() === selectedDate.getTime()
    ) {
      btn.classList.add("date-picker__day--selected");
      btn.setAttribute("aria-selected", "true");
    }

    btn.setAttribute(
      "aria-label",
      date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    );

    if (!disabled) {
      btn.addEventListener("click", () => {
        setSelected(date);
        closePopover();
      });
    } else {
      btn.disabled = true;
    }

    return btn;
  }

  function openPopover() {
    if (isOpen) return;
    isOpen = true;
    popover.hidden = false;
    if (backdrop) backdrop.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    picker.classList.add("date-picker--open");

    if (selectedDate) {
      viewYear = selectedDate.getFullYear();
      viewMonth = selectedDate.getMonth();
    }
    renderGrid();
  }

  function closePopover() {
    if (!isOpen) return;
    isOpen = false;
    popover.hidden = true;
    if (backdrop) backdrop.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
    picker.classList.remove("date-picker--open");
  }

  if (backdrop) {
    backdrop.addEventListener("click", closePopover);
  }

  function changeMonth(delta) {
    viewMonth += delta;
    if (viewMonth > 11) {
      viewMonth = 0;
      viewYear += 1;
    } else if (viewMonth < 0) {
      viewMonth = 11;
      viewYear -= 1;
    }
    renderGrid();
  }

  trigger.addEventListener("click", () => {
    if (isOpen) closePopover();
    else openPopover();
  });

  picker.querySelector('[data-action="prev-month"]').addEventListener(
    "click",
    (e) => {
      e.stopPropagation();
      changeMonth(-1);
    }
  );

  picker.querySelector('[data-action="next-month"]').addEventListener(
    "click",
    (e) => {
      e.stopPropagation();
      changeMonth(1);
    }
  );

  document.addEventListener("click", (e) => {
    if (
      isOpen &&
      !popover.contains(e.target) &&
      !trigger.contains(e.target)
    ) {
      closePopover();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePopover();
  });

  const form = document.getElementById("bookingForm");
  if (form) {
    form.addEventListener("submit", () => {
      if (!hiddenInput.value) {
        trigger.classList.add("error");
        openPopover();
      }
    });
  }

  hiddenInput.addEventListener("invalid", () => {
    trigger.classList.add("error");
    openPopover();
  });

  const initial = parseValueString(hiddenInput.value);
  if (initial) setSelected(initial);
})();
