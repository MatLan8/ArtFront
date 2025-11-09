import styles from "./ProfitsReport.module.css";

function ProfitsReport() {
  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <div className={styles.title}>Profits Report</div>
        <div className={styles.divider} />
        <table>
          <ul>
            <li>Total Sales: $10,000</li>
          </ul>
        </table>
      </div>
    </div>
  );
}

export default ProfitsReport;
