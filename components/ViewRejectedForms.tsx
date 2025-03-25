import { useState, useEffect } from "react";
import styles from "./ViewAcceptedForms.module.css";
import FormReviewDetails from "../components/FormReviewDetails";

interface FormData {
  id: string;
  name: string;
  email: string;
  formLink: string;
  remark: string;
}

export default function ViewAllForms() {
  const [forms, setForms] = useState<FormData[]>([]);
  const [selectedForm, setSelectedForm] = useState<FormData | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const dummyData: FormData[] = [
        { id: "1", name: "John Doe", email: "john@example.com", formLink: "/form/1", remark: "Approved" },
        { id: "2", name: "Jane Smith", email: "jane@example.com", formLink: "/form/2", remark: "Pending" },
        { id: "3", name: "Mike Johnson", email: "mike@example.com", formLink: "/form/3", remark: "Rejected" },
      ];
      setForms(dummyData);
    };
    fetchData();
  }, []);

  const handleViewForm = (form: FormData) => {
    setSelectedForm(form);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <h2 className="text-lg font-semibold mb-4">All Submitted Forms</h2>
      
      {/* Table with added margin-bottom for spacing */}
      <table className={styles.tableContainer}>
        <thead>
          <tr className={styles.header}>
            <th className={styles.cell}>Name</th>
            <th className={styles.cell}>Email ID</th>
            <th className={styles.cell}>Form Link</th>
            <th className={styles.cell}>Remark</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form) => (
            <tr key={form.id} className={styles.row}>
              <td className={styles.cell}>{form.name}</td>
              <td className={styles.cell}>{form.email}</td>
              <td className={styles.cell}>
                <button
                  onClick={() => handleViewForm(form)}
                  className="text-blue-600 hover:underline"
                >
                  View Form
                </button>
              </td>
              <td className={styles.cell}>{form.remark}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form Modal with spacing adjustments */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Form Details</h3>
              <button onClick={closeModal} className={styles.closeButton}>✖</button>
            </div>
            <FormReviewDetails form={selectedForm!} />
          </div>
        </div>
      )}
    </div>
  );
}